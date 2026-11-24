export async function catalogRequest(path, method = 'GET', body) {
  let response;
  let result;
  try {
    response = await fetch(`/api${path}`, {
      method,
      ...(body === undefined ? {} : {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    });
    result = response.status === 204 ? null : await response.json();
  } catch {
    throw new Error('Could not confirm the request. Check the API and database, then reload before trying again.');
  }
  if (!response.ok) {
    const detail = typeof result?.detail === 'string' ? result.detail
      : 'The server rejected this record. Check all fields and selected records.';
    throw new Error(detail);
  }
  const expected = { GET: 200, POST: 201, PUT: 200, DELETE: 204 }[method];
  if (response.status !== expected) throw new Error('The server did not confirm the requested change. Reload to check the saved records.');
  return result;
}

export function positiveInteger(value) {
  const trimmed = value.trim();
  const number = Number(trimmed);
  return /^[0-9]+$/.test(trimmed) && Number.isInteger(number)
    && number > 0 && number <= 2147483647 ? number : null;
}
