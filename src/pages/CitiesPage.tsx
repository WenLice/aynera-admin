import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import { createCity, deleteCity, listCities, updateCity } from "../api/cities";
import { ApiError } from "../api/errors";
import { DetailWithAudit } from "../components/DetailWithAudit";
import { EntityAuditPanel } from "../components/EntityAuditPanel";
import type { EarlyAccessCity } from "../types/api";

const emptyForm = {
  name: "",
  wave: "1",
  sortOrder: "0",
  isActive: true
};

export function CitiesPage() {
  const [cities, setCities] = useState<EarlyAccessCity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [auditRefreshKey, setAuditRefreshKey] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCities(await listCities());
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not load cities.");
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

  function startEdit(city: EarlyAccessCity) {
    setEditingId(city.id);
    setForm({
      name: city.name,
      wave: String(city.wave),
      sortOrder: String(city.sortOrder),
      isActive: city.isActive
    });
    setError(null);
    setInfo(null);
  }

  async function onSave(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setSaving(true);
    const wave = Number(form.wave);
    const sortOrder = Number(form.sortOrder);
    try {
      if (editingId) {
        const updated = await updateCity(editingId, {
          name: form.name.trim(),
          wave,
          sortOrder,
          isActive: form.isActive
        });
        setInfo(`${updated.name} updated.`);
        setAuditRefreshKey((key) => key + 1);
      } else {
        const created = await createCity({
          name: form.name.trim(),
          wave,
          sortOrder,
          isActive: form.isActive
        });
        setInfo(`${created.name} added.`);
        setEditingId(null);
        setForm(emptyForm);
      }
      await load();
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not save that city.");
    } finally {
      setSaving(false);
    }
  }

  async function onToggle(city: EarlyAccessCity) {
    setError(null);
    setInfo(null);
    setBusyId(city.id);
    try {
      const updated = await updateCity(city.id, { isActive: !city.isActive });
      setInfo(`${updated.name} is ${updated.isActive ? "open for apply" : "paused"}.`);
      if (editingId === city.id) {
        setForm((current) => ({ ...current, isActive: updated.isActive }));
        setAuditRefreshKey((key) => key + 1);
      }
      await load();
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not update that city.");
    } finally {
      setBusyId(null);
    }
  }

  async function onRemove(city: EarlyAccessCity) {
    if (!window.confirm(`Remove ${city.name} from the apply catalog? Existing waitlist rows stay.`)) {
      return;
    }

    setError(null);
    setInfo(null);
    setBusyId(city.id);
    try {
      await deleteCity(city.id);
      if (editingId === city.id) {
        startCreate();
      }
      setInfo(`${city.name} was removed.`);
      await load();
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not remove that city.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Cities</h1>
          <p>Open or pause cities for public early-access apply. Soft-delete hides a city from the catalog.</p>
        </div>
        <span className="chip">{cities.length} total</span>
      </div>
      {error ? <div className="banner error">{error}</div> : null}
      {info ? <div className="banner info">{info}</div> : null}

      {editingId ? (
        <div style={{ marginBottom: 16 }}>
          <DetailWithAudit
            details={
              <section className="panel panel-pad">
                <h2 style={{ margin: "0 0 12px", fontSize: 14 }}>Edit city</h2>
                <CityForm
                  form={form}
                  setForm={setForm}
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
                  subjectType: "early_access_city",
                  subjectId: editingId
                }}
                refreshKey={auditRefreshKey}
              />
            }
          />
        </div>
      ) : (
        <section className="panel panel-pad" style={{ marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 14 }}>Add city</h2>
          <CityForm
            form={form}
            setForm={setForm}
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
                <th>City</th>
                <th>Wave</th>
                <th>Sort</th>
                <th>Apply</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.id}>
                  <td className="cell-strong">{city.name}</td>
                  <td>{city.wave}</td>
                  <td>{city.sortOrder}</td>
                  <td>
                    <span className={city.isActive ? "chip success" : "chip warning"}>
                      {city.isActive ? "Open" : "Paused"}
                    </span>
                  </td>
                  <td>
                    <div className="page-actions">
                      <button className="btn btn-ghost btn-sm" type="button" onClick={() => startEdit(city)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        type="button"
                        disabled={busyId === city.id || loading}
                        onClick={() => void onToggle(city)}
                      >
                        {city.isActive ? "Pause" : "Open"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        disabled={busyId === city.id || loading}
                        onClick={() => void onRemove(city)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && cities.length === 0 ? (
                <tr>
                  <td className="cell-muted" colSpan={5}>
                    No cities yet. Add Delhi or Bangalore to open apply.
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

type CityFormState = typeof emptyForm;

type CityFormProps = {
  form: CityFormState;
  setForm: Dispatch<SetStateAction<CityFormState>>;
  saving: boolean;
  onSave: (event: FormEvent) => void;
  onCancel?: () => void;
  submitLabel: string;
};

function CityForm({ form, setForm, saving, onSave, onCancel, submitLabel }: CityFormProps) {
  return (
    <form className="filters" onSubmit={(event) => void onSave(event)} style={{ marginBottom: 0 }}>
      <div className="field">
        <label htmlFor="city-name">Name</label>
        <input
          id="city-name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
      </div>
      <div className="field" style={{ minWidth: 88 }}>
        <label htmlFor="city-wave">Wave</label>
        <input
          id="city-wave"
          type="number"
          min={1}
          max={100}
          value={form.wave}
          onChange={(event) => setForm((current) => ({ ...current, wave: event.target.value }))}
          required
        />
      </div>
      <div className="field" style={{ minWidth: 88 }}>
        <label htmlFor="city-sort">Sort</label>
        <input
          id="city-sort"
          type="number"
          value={form.sortOrder}
          onChange={(event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))}
          required
        />
      </div>
      <label className="field" style={{ minWidth: "auto" }}>
        <span>Apply</span>
        <span style={{ display: "flex", alignItems: "center", height: 36, gap: 8 }}>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
          />
          Open
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

