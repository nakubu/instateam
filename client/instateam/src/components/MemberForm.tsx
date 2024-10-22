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
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

export default function MemberForm({ member }) {
  const [values, setValues] = useState(member);

  useEffect(() => {
    setValues(member);
  }, [member]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <Form method="post" style={{ maxWidth: 600 }}>
      <Typography variant="h6">Info</Typography>
      <TextField
        label="First name"
        name="first_name"
        value={values.first_name}
        onChange={handleChange}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Last name"
        name="last_name"
        value={values.last_name}
        onChange={handleChange}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControl sx={{ mt: 3 }}>
        <Typography variant="h6">Role</Typography>
        <RadioGroup name="role" value={values.role} onChange={handleChange}>
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
        <Button
          type="submit"
          name="intent"
          value="save"
          variant="contained"
          sx={{ order: 2 }}
        >
          Save
        </Button>
        {member.id && (
          <Button
            type="submit"
            name="intent"
            value="delete"
            variant="outlined"
            color="error"
            sx={{ order: 1 }}
          >
            Delete
          </Button>
        )}
      </Stack>
    </Form>
  );
}
