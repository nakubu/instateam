export async function fetchMembers() {
  try {
    const res = await fetch('http://localhost:8000/api/members/');
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorText || res.statusText}`);
    }
    return await res.json();
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
    return await res.json();
  } catch (err) {
    throw new Error(`Error fetching member: ${err}`);
  }
}

export async function addMember(data) {
  try {
    const res = await fetch('http://localhost:8000/api/members/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorText || res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Error adding member: ${err}`);
  }
}

export async function updateMember(id, data) {
  try {
    const res = await fetch(`http://localhost:8000/api/members/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorText || res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Error updating member: ${err}`);
  }
}
