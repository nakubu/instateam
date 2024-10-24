export interface Member {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: 'regular' | 'admin';
}
