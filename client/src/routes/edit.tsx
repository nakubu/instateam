import { Divider, Typography } from '@mui/material';
import { json, redirect, useLoaderData } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { getMember, validateForm } from '../lib/util';
import { deleteMember, fetchMember, updateMember } from '../services/members';
import { Member } from '../types/Member';

const DELETE_CONFIRM = 'Are you sure you want to delete this team member?';

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const formData = await request.formData();
  const errors = validateForm(formData);
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  const member = getMember(formData);

  if (formData.get('intent') === 'delete') {
    if (confirm(DELETE_CONFIRM)) {
      try {
        await deleteMember(params.id);
        return redirect('/');
      } catch (error) {
        alert(error);
      }
    }
  } else {
    try {
      await updateMember(params.id, member);
    } catch (error) {
      alert(error);
    }
  }
  return null;
}

export async function loader({ params }: { params: { id: string } }) {
  const member: Member = await fetchMember(params.id);
  if (!member) {
    throw new Response('', {
      status: 404,
      statusText: 'Not found',
    });
  }
  return { member };
}

export default function EditMember() {
  const { member } = useLoaderData() as { member: Member };

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
