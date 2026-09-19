import { FormEvent, useEffect, useState } from "react";
import { listVenueNotifications, queueVenueHeadsUp, VenueNotification } from "../api/venues";
import { ApiError } from "../api/errors";
import type { Venue } from "../types/api";

export function VenueNotificationsPanel({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date());
  const [visitOn, setVisitOn] = useState(today);
  const [partySize, setPartySize] = useState(2);
  const [note, setNote] = useState("");
  const [rows, setRows] = useState<VenueNotification[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let current = true;
    listVenueNotifications(venue.id).then(value => { if (current) setRows(value); })
      .catch(() => { if (current) setError("Could not load notification history."); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [venue.id]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try { setRows(await listVenueNotifications(venue.id)); }
    catch { setError("Could not refresh notification history."); }
    finally { setLoading(false); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || submitted) return;
    setBusy(true);
    setError(null);
    try {
      const queued = await queueVenueHeadsUp(venue.id, { visitOn, partySize, note: note.trim() || null });
      setRows(previous => [...queued, ...previous]);
      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not confirm submission. Refresh history before trying again.");
    } finally { setBusy(false); }
  }

  return <section className="panel panel-pad" style={{ marginBottom: 16 }}>
    <div className="page-head"><h2>Heads-up for {venue.name}</h2>
      <button type="button" className="btn btn-ghost" disabled={busy} onClick={onClose}>Close</button></div>
    <p>Email and SMS will go to {venue.contactEmail} and {venue.contactPhoneE164}. This is a visit notice, not a booking. The venue decides whether to reserve space.</p>
    {error && <div className="banner error" role="alert">{error}</div>}
    {submitted && <div className="banner info" role="status">Email and SMS queued. Check the history below for delivery status.</div>}
    <form onSubmit={submit}>
      <div className="form-grid">
        <label>Visit date (India)<input type="date" required min={today} value={visitOn} disabled={busy || submitted}
          onChange={e => setVisitOn(e.target.value)} /></label>
        <label>Expected guests<input type="number" required min={1} max={10000} step={1} value={partySize} disabled={busy || submitted}
          onChange={e => setPartySize(Number(e.target.value))} /></label>
        <label>Note for the venue (optional)<textarea maxLength={500} value={note} disabled={busy || submitted}
          onChange={e => setNote(e.target.value)} /></label>
      </div>
      <p className="cell-muted">Send around one day before the visit. Do not include member names or contact details. Delivery starts after submission.</p>
      <button type="submit" className="btn btn-primary" disabled={busy || submitted || !venue.isActive}>
        {busy ? "Queuing…" : submitted ? "Queued" : "Queue email + SMS"}
      </button>
      {!venue.isActive && <p>Activate this venue before sending a heads-up.</p>}
    </form>
    <div className="page-head" style={{ marginTop: 20 }}><h3>Notification history</h3>
      <button type="button" className="btn btn-secondary btn-sm" disabled={loading || busy} onClick={() => void refresh()}>Refresh status</button></div>
    <div className="table-wrap"><table className="data"><thead><tr>
      <th>Visit</th><th>Guests</th><th>Channel</th><th>Status</th><th>Failed attempts</th>
    </tr></thead><tbody>{rows.map(row => <tr key={row.id}>
      <td>{row.visitOn}</td><td>{row.partySize}</td><td>{row.channel}</td><td>{row.status}</td><td>{row.attempts}</td>
    </tr>)}</tbody></table></div>
    {loading && <p>Loading history…</p>}
    {!loading && rows.length === 0 && <p>No heads-up notifications yet.</p>}
  </section>;
}
