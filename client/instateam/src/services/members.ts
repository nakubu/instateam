import { Member } from '../types/Member';

const BASE_URL = 'http://localhost:8000/api/members';

export const fetchMembers = () => makeRequest(BASE_URL);

export const fetchMember = (id: string) => makeRequest(`${BASE_URL}/${id}`);

export const addMember = (data: Member) => makeRequest(`${BASE_URL}/add/`, 'POST', data);

export const updateMember = (id: string, data: Member) => makeRequest(`${BASE_URL}/${id}/`, 'PUT', data);

export const deleteMember = (id: string) => makeRequest(`${BASE_URL}/${id}/`, 'DELETE');

async function makeRequest(url: string, method = 'GET', data: Member | null = null) {
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { 'Content-Type': 'application/json' } : {},
      body: data ? JSON.stringify(data) : null,
    });
    if (!res.ok) {
      await handleError(res);
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    } else {
      return res;
    }
  } catch (err) {
    throw new Error(`API Error: ${err}`);
  }
}

async function handleError(res: Response) {
  const errorText = await res.text();
  throw new Error(`HTTP error ${res.status}: ${errorText || res.statusText}`);
}
