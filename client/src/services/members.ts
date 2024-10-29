import type { APIError } from '../types/APIError';
import type { Member } from '../types/Member';

const BASE_URL = 'http://localhost:8000/api/members/';

export const fetchMembers = (): Promise<Member[]> => makeRequest(BASE_URL);

export const fetchMember = (id: string): Promise<Member> => makeRequest(`${BASE_URL}${id}/`);

export const addMember = (data: Member): Promise<Member | APIError> => makeRequest(`${BASE_URL}add/`, 'POST', data);

export const updateMember = (id: string, data: Member): Promise<Member | APIError> => makeRequest(`${BASE_URL}${id}/`, 'PUT', data);

export const deleteMember = (id: string): Promise<void> => makeRequest(`${BASE_URL}${id}/`, 'DELETE');

async function makeRequest(url: string, method = 'GET', data: Member | null = null) {
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { 'Content-Type': 'application/json' } : {},
      body: data ? JSON.stringify(data) : null,
    });
    if (!res.ok) {
      return await handleError(res);
    }
    if (isJSON(res)) {
      return await res.json();
    } else {
      return res;
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function handleError(res: Response) {
  if (isJSON(res)) {
    return { errors: await res.json(), status: res.status };
  } else {
    throw new Error(`${await res.text() || res.statusText}`);
  }
}

function isJSON(res: Response) {
  const contentType = res.headers.get('content-type');
  return contentType && contentType.includes('application/json');
}
