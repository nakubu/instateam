import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { fetchMember, updateMember } from '../members';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateMember(params.id, updates);
  return redirect('/');
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
      <Typography variant="h4">Edit team member</Typography>
      <Typography variant="body1" color="text.secondary">
        Set email, phone, and role
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Form method="post" id="contact-form">
        <Typography variant="h6">Info</Typography>
        <TextField
          label="First name"
          variant="outlined"
          defaultValue={member?.first_name}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Last name"
          variant="outlined"
          defaultValue={member?.last_name}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          defaultValue={member?.email}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Phone"
          variant="outlined"
          defaultValue={member?.phone}
          margin="normal"
          fullWidth
        />
        <FormControl sx={{ mt: 3 }}>
          <Typography variant="h6">Role</Typography>
          <RadioGroup defaultValue="regular" name="role">
            <FormControlLabel
              value="regular"
              control={<Radio />}
              label="Regular - Can't delete members"
            />
            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="Admin - Can delete members"
            />
          </RadioGroup>
        </FormControl>
        <Stack direction="row" sx={{ mt: 3, justifyContent: 'space-between' }}>
          <Button variant="outlined" color="error">
            Delete
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Stack>
      </Form>
    </>
  );
}
