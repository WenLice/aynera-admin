import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import { createVenue, deleteVenue, listVenues, updateVenue, VenueInput } from "../api/venues";
import { listCities } from "../api/cities";
import { ApiError } from "../api/errors";
import { DetailWithAudit } from "../components/DetailWithAudit";
import { EntityAuditPanel } from "../components/EntityAuditPanel";
import { VenueNotificationsPanel } from "../components/VenueNotificationsPanel";
import type { EarlyAccessCity, Venue, VenueType } from "../types/api";

const emptyForm = {
  name: "",
  type: "Cafe" as VenueType,
  cityId: "",
  area: "",
  address: "",
  contactName: "",
  contactEmail: "",
  contactPhoneE164: "",
  capacity: "",
  photoUrls: "",
  notes: "",
  isActive: true
};

type VenueFormState = typeof emptyForm;

function buildInput(form: VenueFormState): VenueInput {
  const capacity = form.capacity.trim();
  const notes = form.notes.trim();
  return {
    name: form.name.trim(),
    type: form.type,
    cityId: form.cityId,
    area: form.area.trim(),
    address: form.address.trim(),
    contactName: form.contactName.trim(),
    contactEmail: form.contactEmail.trim(),
    contactPhoneE164: form.contactPhoneE164.trim(),
    photoUrls: form.photoUrls
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0),
    capacity: capacity === "" ? null : Number(capacity),
    notes: notes === "" ? null : notes,
    isActive: form.isActive
  };
}

export function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [cities, setCities] = useState<EarlyAccessCity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [auditRefreshKey, setAuditRefreshKey] = useState(0);
  const [notificationVenueId, setNotificationVenueId] = useState<string | null>(null);
  const notificationVenue = venues.find(venue => venue.id === notificationVenueId);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [venueRows, cityRows] = await Promise.all([listVenues(), listCities()]);
      setVenues(venueRows);
      setCities(cityRows);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not load venues.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setInfo(null);
  }

  function startEdit(venue: Venue) {
    setEditingId(venue.id);
    setForm({
      name: venue.name,
      type: venue.type,
      cityId: venue.cityId,
      area: venue.area,
      address: venue.address,
      contactName: venue.contactName,
      contactEmail: venue.contactEmail,
      contactPhoneE164: venue.contactPhoneE164,
      capacity: venue.capacity == null ? "" : String(venue.capacity),
      photoUrls: venue.photoUrls.join("\n"),
      notes: venue.notes ?? "",
      isActive: venue.isActive
    });
    setError(null);
    setInfo(null);
  }

  async function onSave(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateVenue(editingId, buildInput(form));
        setInfo(`${updated.name} updated.`);
        setAuditRefreshKey((key) => key + 1);
      } else {
        const created = await createVenue(buildInput(form));
        setInfo(`${created.name} added.`);
        setEditingId(null);
        setForm(emptyForm);
      }
      await load();
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not save that venue.");
    } finally {
      setSaving(false);
    }
  }

  async function onToggle(venue: Venue) {
    setError(null);
    setInfo(null);
    setBusyId(venue.id);
    try {
      const updated = await updateVenue(venue.id, { isActive: !venue.isActive });
      setInfo(`${updated.name} is now ${updated.isActive ? "active" : "inactive"}.`);
      if (editingId === venue.id) {
        setForm((current) => ({ ...current, isActive: updated.isActive }));
        setAuditRefreshKey((key) => key + 1);
      }
      await load();
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not update that venue.");
    } finally {
      setBusyId(null);
    }
  }

  async function onRemove(venue: Venue) {
    if (!window.confirm(`Remove ${venue.name} from the catalog?`)) {
      return;
    }

    setError(null);
    setInfo(null);
    setBusyId(venue.id);
    try {
      await deleteVenue(venue.id);
      if (editingId === venue.id) {
        startCreate();
      }
      setInfo(`${venue.name} was removed.`);
      await load();
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not remove that venue.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Venues</h1>
          <p>
            Partner cafés and event places. Full address and venue-contact details are staff-only and are
            never shown to members.
          </p>
        </div>
        <span className="chip">{venues.length} total</span>
      </div>
      {error ? <div className="banner error">{error}</div> : null}
      {info ? <div className="banner info">{info}</div> : null}
      {notificationVenue && <VenueNotificationsPanel key={notificationVenue.id} venue={notificationVenue}
        onClose={() => setNotificationVenueId(null)} />}
      {!loading && cities.length === 0 ? (
        <div className="banner warn">Add a city first — venues must belong to a city.</div>
      ) : null}

      {editingId ? (
        <div style={{ marginBottom: 16 }}>
          <DetailWithAudit
            details={
              <section className="panel panel-pad">
                <h2 style={{ margin: "0 0 12px", fontSize: 14 }}>Edit venue</h2>
                <VenueForm
                  form={form}
                  setForm={setForm}
                  cities={cities}
                  saving={saving}
                  onSave={onSave}
                  onCancel={startCreate}
                  submitLabel="Save"
                />
              </section>
            }
            audit={
              <EntityAuditPanel
                filters={{
                  subjectType: "venue",
                  subjectId: editingId
                }}
                refreshKey={auditRefreshKey}
              />
            }
          />
        </div>
      ) : (
        <section className="panel panel-pad" style={{ marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 14 }}>Add venue</h2>
          <VenueForm
            form={form}
            setForm={setForm}
            cities={cities}
            saving={saving}
            onSave={onSave}
            submitLabel="Add"
          />
        </section>
      )}

      <section className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>City</th>
                <th>Area</th>
                <th>Contact</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td className="cell-strong">{venue.name}</td>
                  <td>{venue.type === "EventPlace" ? "Event place" : "Café"}</td>
                  <td>{venue.cityName ?? "—"}</td>
                  <td>{venue.area}</td>
                  <td className="cell-muted">{venue.contactEmail}</td>
                  <td>
                    <span className={venue.isActive ? "chip success" : "chip warning"}>
                      {venue.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="page-actions">
                      <button className="btn btn-ghost btn-sm" type="button" onClick={() => startEdit(venue)}>
                        Edit
                      </button>
                      <button className="btn btn-ghost btn-sm" type="button" onClick={() => setNotificationVenueId(venue.id)}>
                        Heads-up / history
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        type="button"
                        disabled={busyId === venue.id || loading}
                        onClick={() => void onToggle(venue)}
                      >
                        {venue.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        disabled={busyId === venue.id || loading}
                        onClick={() => void onRemove(venue)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && venues.length === 0 ? (
                <tr>
                  <td className="cell-muted" colSpan={7}>
                    No venues yet. Add a partner café or event place.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

type VenueFormProps = {
  form: VenueFormState;
  setForm: Dispatch<SetStateAction<VenueFormState>>;
  cities: EarlyAccessCity[];
  saving: boolean;
  onSave: (event: FormEvent) => void;
  onCancel?: () => void;
  submitLabel: string;
};

function VenueForm({ form, setForm, cities, saving, onSave, onCancel, submitLabel }: VenueFormProps) {
  return (
    <form className="filters" onSubmit={(event) => void onSave(event)} style={{ marginBottom: 0 }}>
      <div className="field">
        <label htmlFor="venue-name">Name</label>
        <input
          id="venue-name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
      </div>
      <div className="field" style={{ minWidth: 140 }}>
        <label htmlFor="venue-type">Type</label>
        <select
          id="venue-type"
          value={form.type}
          onChange={(event) =>
            setForm((current) => ({ ...current, type: event.target.value as VenueType }))
          }
        >
          <option value="Cafe">Café</option>
          <option value="EventPlace">Event place</option>
        </select>
      </div>
      <div className="field" style={{ minWidth: 160 }}>
        <label htmlFor="venue-city">City</label>
        <select
          id="venue-city"
          value={form.cityId}
          onChange={(event) => setForm((current) => ({ ...current, cityId: event.target.value }))}
          required
        >
          <option value="" disabled>
            Select a city
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
              {city.isActive ? "" : " (paused)"}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="venue-area">Area (member-visible)</label>
        <input
          id="venue-area"
          value={form.area}
          placeholder="e.g. Hauz Khas"
          onChange={(event) => setForm((current) => ({ ...current, area: event.target.value }))}
          required
        />
      </div>
      <div className="field" style={{ minWidth: 240 }}>
        <label htmlFor="venue-address">Address (staff-only)</label>
        <input
          id="venue-address"
          value={form.address}
          onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="venue-contact-name">Contact name</label>
        <input
          id="venue-contact-name"
          value={form.contactName}
          onChange={(event) => setForm((current) => ({ ...current, contactName: event.target.value }))}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="venue-contact-email">Contact email</label>
        <input
          id="venue-contact-email"
          type="email"
          value={form.contactEmail}
          onChange={(event) => setForm((current) => ({ ...current, contactEmail: event.target.value }))}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="venue-contact-phone">Contact phone</label>
        <input
          id="venue-contact-phone"
          value={form.contactPhoneE164}
          placeholder="+9198…"
          onChange={(event) =>
            setForm((current) => ({ ...current, contactPhoneE164: event.target.value }))
          }
          required
        />
      </div>
      <div className="field" style={{ minWidth: 96 }}>
        <label htmlFor="venue-capacity">Capacity</label>
        <input
          id="venue-capacity"
          type="number"
          min={1}
          value={form.capacity}
          onChange={(event) => setForm((current) => ({ ...current, capacity: event.target.value }))}
        />
      </div>
      <div className="field" style={{ minWidth: 240 }}>
        <label htmlFor="venue-photos">Photo URLs (one per line)</label>
        <textarea
          id="venue-photos"
          rows={2}
          value={form.photoUrls}
          onChange={(event) => setForm((current) => ({ ...current, photoUrls: event.target.value }))}
        />
      </div>
      <div className="field" style={{ minWidth: 240 }}>
        <label htmlFor="venue-notes">Notes (staff-only)</label>
        <textarea
          id="venue-notes"
          rows={2}
          value={form.notes}
          onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
        />
      </div>
      <label className="field" style={{ minWidth: "auto" }}>
        <span>Status</span>
        <span style={{ display: "flex", alignItems: "center", height: 36, gap: 8 }}>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
          />
          Active
        </span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={saving}>
        {saving ? "Saving…" : submitLabel}
      </button>
      {onCancel ? (
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      ) : null}
    </form>
  );
}
