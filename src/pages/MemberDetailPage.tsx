import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getMember,
  getMemberPhotoBlob,
  getMemberVideoBlob,
  restrictMember,
  unrestrictMember
} from "../api/members";
import { ApiError } from "../api/errors";
import { useAuth } from "../auth/AuthContext";
import { DetailWithAudit } from "../components/DetailWithAudit";
import { EntityAuditPanel } from "../components/EntityAuditPanel";
import type { MemberAdminDetail } from "../types/api";
import { formatWhen } from "./InboxPage";

function displayName(row: MemberAdminDetail): string {
  const name = [row.firstName, row.lastName].filter(Boolean).join(" ").trim();
  return name.length > 0 ? name : "Member";
}

function ageYears(dateOfBirth: string | null): string | null {
  if (!dateOfBirth) {
    return null;
  }

  const birth = new Date(`${dateOfBirth}T00:00:00`);
  if (Number.isNaN(birth.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return String(age);
}

export function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { account } = useAuth();
  const [member, setMember] = useState<MemberAdminDetail | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [auditRefreshKey, setAuditRefreshKey] = useState(0);
  const canRestrict = Boolean(account?.isSuperAdmin);

  useEffect(() => {
    let cancelled = false;
    const objectUrls: string[] = [];

    async function load() {
      if (!id) {
        setError("Missing member id.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const detail = await getMember(id);
        const photos = await Promise.all(
          [...detail.photos]
            .sort((left, right) => left.sortOrder - right.sortOrder)
            .map(async (photo) => {
              const blob = await getMemberPhotoBlob(detail.id, photo.id);
              const url = URL.createObjectURL(blob);
              objectUrls.push(url);
              return url;
            })
        );
        let video: string | null = null;
        if (detail.introductionVideo) {
          const blob = await getMemberVideoBlob(detail.id);
          video = URL.createObjectURL(blob);
          objectUrls.push(video);
        }

        if (!cancelled) {
          setMember(detail);
          setPhotoUrls(photos);
          setVideoUrl(video);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof ApiError ? cause.message : "Could not load this member.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
      for (const url of objectUrls) {
        URL.revokeObjectURL(url);
      }
    };
  }, [id]);

  async function onToggleRestrict() {
    if (!member || !canRestrict) {
      return;
    }

    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const updated = member.isRestricted
        ? await unrestrictMember(member.id)
        : await restrictMember(member.id);
      setMember({ ...member, isRestricted: updated.isRestricted });
      setInfo(
        updated.isRestricted
          ? "Member restricted. Sign-in is blocked and sessions were revoked."
          : "Member unrestricted."
      );
      setAuditRefreshKey((key) => key + 1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not update this member.");
    } finally {
      setBusy(false);
    }
  }

  const age = member ? ageYears(member.dateOfBirth) : null;
  const membersBackHref = member?.isRestricted ? "/restricted" : "/members";
  const membersBackLabel = member?.isRestricted ? "Restricted" : "Members";

  return (
    <>
      <div className="page-head">
        <div>
          <p className="login-meta" style={{ textAlign: "left", margin: "0 0 8px" }}>
            <Link to={membersBackHref}>{membersBackLabel}</Link>
            {member ? ` / ${displayName(member)}` : ""}
          </p>
          <h1>{member ? displayName(member) : "Member"}</h1>
          <p>
            {member?.city ?? "—"}
            {age ? ` · Age ${age}` : ""}
            {member ? ` · Joined ${formatWhen(member.createdAtUtc)}` : ""}
          </p>
        </div>
        {member ? (
          <div className="page-actions">
            <span className={member.isActive ? "chip success" : "chip warning"}>
              {member.isActive ? "Active" : "Inactive"}
            </span>
            <span className={member.isRestricted ? "chip warning" : "chip"}>
              {member.isRestricted ? "Restricted" : "Not restricted"}
            </span>
            {canRestrict ? (
              <button
                className={member.isRestricted ? "btn btn-secondary btn-sm" : "btn btn-danger btn-sm"}
                type="button"
                disabled={busy || loading}
                onClick={() => void onToggleRestrict()}
              >
                {busy ? "Updating…" : member.isRestricted ? "Unrestrict" : "Restrict"}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      {error ? <div className="banner error">{error}</div> : null}
      {info ? <div className="banner info">{info}</div> : null}
      {loading && !member ? <p className="cell-muted">Loading member…</p> : null}
      {member ? (
        <DetailWithAudit
          details={
            <>
              <section className="panel panel-pad">
                <h3 className="member-section-title">Profile</h3>
                <div className="metric-row">
                  <span>Gender</span>
                  <strong>{member.gender ?? "—"}</strong>
                </div>
                <div className="metric-row">
                  <span>Date of birth</span>
                  <strong>{member.dateOfBirth ?? "—"}</strong>
                </div>
                <div className="metric-row">
                  <span>City</span>
                  <strong>{member.city ?? "—"}</strong>
                </div>
                <div className="metric-row">
                  <span>Religion</span>
                  <strong>{member.religion ?? "—"}</strong>
                </div>
                <div className="metric-row">
                  <span>Email</span>
                  <strong>{member.email ?? "—"}</strong>
                </div>
                <div className="metric-row">
                  <span>Phone</span>
                  <strong>{member.phone ?? "—"}</strong>
                </div>
                <div className="metric-row">
                  <span>Confirmed</span>
                  <strong>
                    {member.phoneConfirmed ? "Phone" : "Phone pending"}
                    {" · "}
                    {member.emailConfirmed ? "Email" : "Email pending"}
                  </strong>
                </div>
                <div className="metric-row">
                  <span>Self status</span>
                  <strong>{member.isActive ? "Active" : "Deactivated by member"}</strong>
                </div>
                <div className="metric-row">
                  <span>Restriction</span>
                  <strong>{member.isRestricted ? "Restricted by admin" : "None"}</strong>
                </div>
              </section>
              <section className="panel panel-pad">
                <h3 className="member-section-title">Photos</h3>
                {photoUrls.length > 0 ? (
                  <div className="member-photos">
                    {photoUrls.map((url) => (
                      <img key={url} src={url} alt="" />
                    ))}
                  </div>
                ) : (
                  <p className="cell-muted">No photos uploaded.</p>
                )}
              </section>
              <section className="panel panel-pad">
                <h3 className="member-section-title">Introduction video</h3>
                {videoUrl ? (
                  <video className="member-video" controls src={videoUrl} />
                ) : (
                  <p className="cell-muted">No introduction video uploaded.</p>
                )}
                {member.introductionVideo ? (
                  <p className="tiny muted">
                    Face match {member.introductionVideo.faceMatchStatus}
                    {member.introductionVideo.guidelinePassed
                      ? " · Guidelines passed"
                      : " · Guidelines failed"}
                  </p>
                ) : null}
              </section>
            </>
          }
          audit={
            <EntityAuditPanel
              filters={{ memberId: member.id }}
              refreshKey={auditRefreshKey}
            />
          }
        />
      ) : null}
    </>
  );
}
