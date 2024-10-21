import { Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Typography variant="h4">Oops!</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        {error.statusText || error.message}
      </Typography>
    </div>
  );
}
