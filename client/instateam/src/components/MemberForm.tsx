import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
  useRadioGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { Form, useNavigation } from 'react-router-dom';

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  '.MuiFormControlLabel-label': {
    flexGrow: 1,
  },
  variants: [
    {
      props: { checked: false },
      style: {
        '.MuiFormControlLabel-label': {
          color: theme.palette.text.secondary,
        },
      },
    },
  ],
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function MemberForm({ member }) {
  const navigation = useNavigation();
  const [values, setValues] = useState(member);
  const isSubmitting = navigation.state === 'submitting';

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
      <TextField
        label="First name"
        name="first_name"
        value={values.first_name}
        onChange={handleChange}
        required
        margin="normal"
        fullWidth
      />
      <TextField
        label="Last name"
        name="last_name"
        value={values.last_name}
        onChange={handleChange}
        required
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
        margin="normal"
        fullWidth
      />
      <PatternFormat
        label="Phone"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        required
        format="###-###-####"
        mask="_"
        customInput={TextField}
        margin="normal"
        fullWidth
      />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <Typography variant="h6">Role</Typography>
        <RadioGroup
          name="role"
          value={values.role}
          defaultValue="regular"
          onChange={handleChange}
          sx={{ mt: 1 }}
        >
          <MyFormControlLabel
            value="regular"
            control={<Radio />}
            label="Regular - Can't delete members"
            labelPlacement="start"
          />
          <Divider />
          <MyFormControlLabel
            value="admin"
            control={<Radio />}
            label="Admin - Can delete members"
            labelPlacement="start"
          />
          <Divider />
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
          disabled={isSubmitting}
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
            disabled={isSubmitting}
            sx={{ order: 1 }}
          >
            Delete
          </Button>
        )}
      </Stack>
    </Form>
  );
}
