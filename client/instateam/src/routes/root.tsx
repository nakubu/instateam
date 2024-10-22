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
  Tooltip,
  Typography,
} from '@mui/material';
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { fetchMembers } from '../services/members';

export async function loader() {
  const members = await fetchMembers();
  return { members };
}

function getAvatar(member) {
  return `${member.first_name[0].toUpperCase()}${member.last_name[0].toUpperCase()}`;
}

function getIsSelected(member, id) {
  return member.id.toString() === id;
}

export default function Root() {
  const { id } = useParams();
  const { members } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
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
              <Tooltip title="Add team member">
                <IconButton color="primary" component={NavLink} to="add">
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="h4">Team members</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              You have {members.length} team member{members.length > 1 && 's'}
            </Typography>
          </Box>
          <List component="nav">
            <Divider variant="middle" />
            {members.map((member) => (
              <>
                <ListItemButton
                  key={member.id}
                  selected={getIsSelected(member, id)}
                  component={NavLink}
                  to={`members/${member.id}`}
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
              </>
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
