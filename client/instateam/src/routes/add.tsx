import { Divider, Typography } from '@mui/material';
import { redirect } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { addMember } from '../services/members';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { id } = await addMember(data);
  return redirect(`/members/${id}`);
}

export default function AddMember() {
  const member = {};

  return (
    <>
      <Typography variant="h4">Add team member</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Set email, phone, and role
      </Typography>
      <Divider sx={{ my: 3 }} />
      <MemberForm member={member} />
    </>
  );
}
