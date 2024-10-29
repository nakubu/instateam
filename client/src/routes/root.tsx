import { Add } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { fetchMembers } from '../services/members';
import { Member } from '../types/Member';

export async function loader() {
  const members = await fetchMembers();
  return { members };
}

function getAvatar(member: Member) {
  return `${member.first_name[0].toUpperCase()}${member.last_name[0].toUpperCase()}`;
}

export default function Root() {
  const { id } = useParams();
  const { members } = useLoaderData() as { members: Member[] };
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [setIsAlertOpen, setSetIsAlertOpen] = useState(false);
  const filteredMembers = members.filter((member) =>
    `${member.first_name} ${member.last_name}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  useEffect(() => {
    const message = sessionStorage.getItem('statusMessage');
    if (message && navigation.state === 'idle') {
      setStatusMessage(message);
      setSetIsAlertOpen(true);
      sessionStorage.removeItem('statusMessage');
    }
  }, [navigation.state]);

  function getIsSelected(member: Member) {
    return member.id?.toString() === id;
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <>
      <Snackbar
        message={statusMessage}
        open={setIsAlertOpen}
        onClose={() => setSetIsAlertOpen(false)}
        autoHideDuration={5000}
      />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 320,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: 320 },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Tooltip title="Add team member" placement="left">
                <IconButton color="primary" component={NavLink} to="add">
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="h4">Team members</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              You have {members.length} team member{members.length > 1 && 's'}
            </Typography>
            <TextField
              label="Search..."
              name="query"
              type="search"
              value={query}
              onChange={handleSearch}
              variant="standard"
              fullWidth
              sx={{ mt: 3 }}
            />
          </Box>
          <List component="nav">
            <Divider variant="middle" />
            {filteredMembers.map((member) => (
              <Box key={member.id}>
                <ListItemButton
                  selected={getIsSelected(member)}
                  component={NavLink}
                  to={`members/${member.id}/`}
                >
                  <ListItemAvatar>
                    <Avatar>{getAvatar(member)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${member.first_name} ${member.last_name}`}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {member.phone}
                        </Typography>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {member.email}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
                <Divider variant="middle" />
              </Box>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ p: 3, flexGrow: 1 }}
          className={navigation.state === 'loading' ? 'loading' : ''}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
