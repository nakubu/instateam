import { Divider, Typography } from '@mui/material';
import { json, redirect } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { getMember, validateForm } from '../lib/util';
import { addMember } from '../services/members';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const errors = validateForm(formData);
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  const member = getMember(formData);

  try {
    const { id } = await addMember(member);
    return redirect(`/members/${id}`);
  } catch (error) {
    alert(error);
    return null;
  }
}

export default function AddMember() {
  const member = {};

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
