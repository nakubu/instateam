import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form } from 'react-router-dom';

export default function MemberForm({ member }) {
  console.log(member);

  return (
    <Form method="post" style={{ maxWidth: 600 }}>
      <Typography variant="h6">Info</Typography>
      <TextField
        label="First name"
        name="first_name"
        defaultValue={member?.first_name}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Last name"
        name="last_name"
        defaultValue={member?.last_name}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        defaultValue={member?.email}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        type="tel"
        defaultValue={member?.phone}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControl sx={{ mt: 3 }}>
        <Typography variant="h6">Role</Typography>
        <RadioGroup defaultValue={member?.role} name="role" required>
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
      <Stack
        direction="row"
        sx={{ mt: 3, justifyContent: member.id ? 'space-between' : 'flex-end' }}
      >
        {member.id && (
          <Button variant="outlined" color="error" onClick={() => {}}>
            Delete
          </Button>
        )}
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </Form>
  );
}
