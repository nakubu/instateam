import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { fetchMembers } from '../members';

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
            <Typography variant="h4">Team members</Typography>
            <Typography variant="body1" color="text.secondary">
              You have {members.length} team member{members.length > 1 && 's'}
            </Typography>
          </Box>
          <List component="nav">
            {members.map((member) => (
              <ListItemButton
                selected={getIsSelected(member, id)}
                key={member.id}
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
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          className={navigation.state === 'loading' ? 'loading' : ''}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
