import React, { useEffect, useState } from 'react';
import { catalogRequest, positiveInteger } from './catalogApi.js';

function RecordEditor({ title, singular, kind, records, fields, available, onSaved, describe }) {
  const emptyValues = () => Object.fromEntries(fields.map((field) => [field.name, '']));
  const [values, setValues] = useState(emptyValues);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function clearForm() {
    setValues(emptyValues());
    setEditingId(null);
  }

  async function save(event) {
    event.preventDefault();
    if (busy || !available) return;
    setMessage('');
    setError('');
    const body = {};
    for (const field of fields) {
      const value = field.numeric ? positiveInteger(values[field.name]) : values[field.name].trim();
      if (value === null || value === '') {
        setError(field.numeric
          ? `${field.label}: choose or enter a positive whole number up to 2147483647.`
          : `${field.label} is required.`);
        return;
      }
      body[field.name] = value;
    }
    setBusy(true);
    try {
      const saved = await catalogRequest(`/${kind}${editingId === null ? '' : `/${editingId}`}`,
        editingId === null ? 'POST' : 'PUT', body);
      clearForm();
      setMessage(`${singular} saved (ID ${saved.id}).`);
      await onSaved();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(record) {
    if (busy || !available || !window.confirm(`Delete ${singular} ${record.id}?`)) return;
    setBusy(true);
    setMessage('');
    setError('');
    try {
      await catalogRequest(`/${kind}/${record.id}`, 'DELETE');
      if (editingId === record.id) clearForm();
      setMessage(`${singular} deleted.`);
      await onSaved();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-label={title}>
      <h2>{title}</h2>
      {available && (records.length ? (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {describe(record)}{' '}
              <button type="button" disabled={busy} aria-label={`Edit ${singular} ${record.id}`}
                onClick={() => {
                  setValues(Object.fromEntries(fields.map((field) => [field.name, String(record[field.name])])));
                  setEditingId(record.id);
                  setError('');
                  setMessage('');
                }}>
                Edit
              </button>
              {kind !== 'sections' && <button type="button" disabled={busy}
                aria-label={`Delete ${singular} ${record.id}`} onClick={() => remove(record)}>Delete</button>}
            </li>
          ))}
        </ul>
      ) : <p>No {kind} have been added yet.</p>)}
      <h3>{editingId === null ? `Add ${singular}` : `Edit ${singular} ${editingId}`}</h3>
      <form onSubmit={save} noValidate>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={`${kind}-${field.name}`}>{field.label}</label>
            {field.options ? (
              <select id={`${kind}-${field.name}`} disabled={busy || !available}
                value={values[field.name]} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}>
                <option value="">Choose {field.label.toLowerCase()}</option>
                {field.options.map((option) => <option key={option.id} value={option.id}>{option.text}</option>)}
              </select>
            ) : (
              <input id={`${kind}-${field.name}`} type="text" inputMode={field.numeric ? 'numeric' : undefined}
                disabled={busy || !available} value={values[field.name]}
                onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} />
            )}
          </div>
        ))}
        <button type="submit" disabled={busy || !available}>
          {busy ? 'Saving...' : editingId === null ? `Add ${singular}` : `Save ${singular}`}
        </button>
        {editingId !== null && <button type="button" disabled={busy} onClick={() => {
          clearForm(); setError(''); setMessage('');
        }}>Cancel edit</button>}
      </form>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}

export default function Catalog() {
  const [data, setData] = useState({ teachers: [], courses: [], sections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadCatalog(active = () => true) {
    setLoading(true);
    setError('');
    try {
      const [teachers, courses, sections] = await Promise.all([
        catalogRequest('/teachers'), catalogRequest('/courses'), catalogRequest('/sections'),
      ]);
      if (active()) setData({ teachers, courses, sections });
    } catch (failure) {
      if (active()) setError(failure.message);
    } finally {
      if (active()) setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    loadCatalog(() => active);
    return () => { active = false; };
  }, []);

  const available = !loading && !error;
  return (
    <div>
      <h2>Catalog records</h2>
      {loading && <p role="status">Loading catalog...</p>}
      {error && <p role="alert">{error}</p>}
      <button type="button" disabled={loading} onClick={() => loadCatalog()}>
        {error ? 'Retry loading catalog' : 'Reload catalog'}
      </button>
      <RecordEditor title="Teachers" singular="teacher" kind="teachers" records={data.teachers}
        fields={[{ name: 'display_name', label: 'Display name' }]} available={available} onSaved={() => loadCatalog()}
        describe={(record) => `T${record.id} — ${record.display_name}`} />
      <RecordEditor title="Courses" singular="course" kind="courses" records={data.courses}
        fields={[{ name: 'title', label: 'Course title' }]} available={available} onSaved={() => loadCatalog()}
        describe={(record) => `C${record.id} — ${record.title}`} />
      <RecordEditor title="Sections" singular="section" kind="sections" records={data.sections}
        fields={[
          { name: 'label', label: 'Section label' },
          { name: 'course_id', label: 'Course', numeric: true, options: data.courses.map((record) => ({ id: record.id, text: `C${record.id} — ${record.title}` })) },
          { name: 'teacher_id', label: 'Teacher', numeric: true, options: data.teachers.map((record) => ({ id: record.id, text: `T${record.id} — ${record.display_name}` })) },
          { name: 'seat_limit', label: 'Seat limit', numeric: true },
        ]} available={available} onSaved={() => loadCatalog()}
        describe={(record) => {
          const course = data.courses.find((item) => item.id === record.course_id);
          const teacher = data.teachers.find((item) => item.id === record.teacher_id);
          return `${record.label} (ID ${record.id}) — ${course?.title ?? 'Course unavailable'} (C${record.course_id}) — ${teacher?.display_name ?? 'Teacher unavailable'} (T${record.teacher_id}) — Seat limit: ${record.seat_limit}`;
        }} />
    </div>
  );
}
