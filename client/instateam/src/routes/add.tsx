import { Divider, Typography } from '@mui/material';
import { redirect } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { getMember } from '../lib/util';
import { addMember } from '../services/members';

export async function action({ request }: { request: Request }) {
  const member = getMember(await request.formData());
  const { id } = await addMember(member);
  return redirect(`/members/${id}`);
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
