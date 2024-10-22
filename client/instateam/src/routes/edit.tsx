import { Divider, Typography } from '@mui/material';
import { redirect, useLoaderData } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { deleteMember, fetchMember, updateMember } from '../services/members';

const DELETE_CONFIRM = 'Are you sure you want to delete this team member?';

export async function action({ request, params }) {
  const data = Object.fromEntries(await request.formData());
  if (data.intent === 'delete') {
    if (confirm(DELETE_CONFIRM)) {
      await deleteMember(params.id);
      return redirect('/');
    }
  } else {
    await updateMember(params.id, data);
  }
  return null;
}

export async function loader({ params }) {
  const member = await fetchMember(params.id);
  if (!member) {
    throw new Response('', {
      status: 404,
      statusText: 'Not found',
    });
  }
  return { member };
}

export default function EditMember() {
  const { member } = useLoaderData();

  return (
    <>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Edit team member
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Edit email, phone, and role
      </Typography>
      <Divider sx={{ my: 3 }} />
      <MemberForm member={member} />
    </>
  );
}
