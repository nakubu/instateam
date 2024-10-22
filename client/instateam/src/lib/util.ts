import { Member } from '../types/Member';

export function getMember(formData: FormData): Member {
  return {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    role: formData.get('role') as 'regular' | 'admin',
  };
}
