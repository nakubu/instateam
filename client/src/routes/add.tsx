import { Divider, Typography } from '@mui/material';
import { json, redirect } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { getMember, validateForm } from '../lib/util';
import { addMember } from '../services/members';
import type { Member } from '../types/Member';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const errors = validateForm(formData);
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  const member = getMember(formData);

  try {
    const data = await addMember(member);
    if ('errors' in data) {
      return json({ errors: data.errors }, { status: data.status });
    } else {
      return redirect(`/members/${data.id}`);
    }
  } catch (error) {
    alert(error);
  }
  return null;
}

export default function AddMember() {
  const member = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: 'regular' as Member['role'],
  };

  return (
    <>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Add team member
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Set email, phone, and role
      </Typography>
      <Divider sx={{ my: 3 }} />
      <MemberForm member={member} />
    </>
  );
}
