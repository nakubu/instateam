export async function fetchMembers() {
  try {
    const res = await fetch('http://localhost:8000/api/members/');
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorText || res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Error fetching members: ${err}`);
  }
}

export async function fetchMember(id) {
  try {
    const res = await fetch(`http://localhost:8000/api/members/${id}`);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorText || res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Error fetching member: ${err}`);
  }
}

export async function updateMember(id, updates) {
  console.log(updates);

  try {
    const res = await fetch(`http://localhost:8000/api/members/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorText || res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Error updating member: ${err}`);
  }
}
