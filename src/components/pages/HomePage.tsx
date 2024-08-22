import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import WebApp from '@twa-dev/sdk';
import { useRecoilState } from 'recoil';
import { userState, GodInfo } from '../UserContext';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const newOrGetUserUrl = process.env.NEW_OR_GET_USER_URL;

interface Task {
  id: number;
  name: string;
  tokens: number;
}

const dailyTasks: Task[] = [
  { id: 1, name: 'Play game', tokens: 100 },
  { id: 2, name: 'Share with your friends', tokens: 300 },
];

const commonTasks: Task[] = [
  { id: 3, name: 'Join subscription channel', tokens: 1500 },
  { id: 4, name: 'Follow @telewordle on twitter', tokens: 1000 },
  { id: 5, name: 'Invite 3 friends', tokens: 500 },
  { id: 6, name: 'Invite 5 friends', tokens: 1000 },
  { id: 7, name: 'Invite 10 friends', tokens: 2000 },
];

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: '0.3rem 16px',
        borderRadius: '0.5rem',
        bgcolor: '#252625',
        color: 'white',
        fontWeight: 'normal',
        boxShadow: 1,
        mb: 0.75,
        fontFamily: 'sans-serif',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{ flex: 1 }}
      >
        <Typography sx={{ mb: 0.1, fontSize: '0.85rem', color: '#E3E3E3', fontFamily: 'sans-serif' }}>
          {task.name}
        </Typography>
        <Typography sx={{ color: '#E3E3E3', fontSize: '0.55rem', display: 'flex', alignItems: 'center' }}>
          <TokenIcon sx={{ fontSize: '0.6rem', mr: 0.25, fontFamily: 'sans-serif' }} />
          X {task.tokens}
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ fontSize: '0.55rem', padding: '0.25rem 0.5rem', backgroundColor: '#44A9EE', color: 'white', fontFamily: 'sans-serif' }}
        >
          Claim
        </Button>
      </Box>
    </Box>
  );
};

const HomePage: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const fetchData = async () => {
    const API_URL = {newOrGetUserUrl};
    let referrerId = Number(WebApp.initDataUnsafe.start_param);
    if (isNaN(referrerId)) {
      console.error('Invalid referrerId:', WebApp.initDataUnsafe.start_param);
      referrerId = -999999999;
    }
    const response = await axios.post<GodInfo>(API_URL, {
      "referrerId": referrerId,
      "userId": WebApp.initDataUnsafe.user?.id ?? "-999999999",
      "name": WebApp.initDataUnsafe.user?.first_name + " " + WebApp.initDataUnsafe.user?.last_name
    });
  };

  return (
    <Box sx={{
      height: 'calc(100vh - 135px)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      WebkitScrollbar: {
        display: 'none',
      } as React.CSSProperties,
    }}>
      <Link to="/play" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', textDecoration: 'none' }}>
        <Button variant="contained"
          sx={{ fontSize: '20px', padding: '0.1rem 0rem', backgroundColor: '#44A9EE', color: 'black', borderRadius: '20px', fontWeight: 'bold', fontFamily: 'sans-serif' }}
          onClick={fetchData} // Add this line
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              PLAY TELEWORDLE!
            </div>
            <img src={require('../../assets/click.gif')} alt="Telegram GIF" style={{ width: '25%' }} />
          </div>
        </Button>
      </Link>
      <Box sx={{ height: '100vh', padding: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              borderRadius: 6,
              padding: 0,
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                bgcolor: '#202020',
                color: '#E3E3E3',
                padding: '0.25rem',
                borderRadius: '6px 6px 0 0',
                fontSize: '0.85rem',
                fontFamily: 'sans-serif',
              }}
            >
              Daily
            </Typography>
            <Box
              sx={{
                bgcolor: '#1F1F1F',
                borderRadius: '0 0 12px 12px',
                padding: 1,
              }}
            >
              {dailyTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: 6,
              padding: 0,
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                bgcolor: '#202020',
                color: '#E3E3E3',
                padding: '0.25rem',
                borderRadius: '6px 6px 0 0',
                fontSize: '0.85rem',
                fontFamily: 'sans-serif',
              }}
            >
              Common
            </Typography>
            <Box
              sx={{
                bgcolor: '#1F1F1F',
                borderRadius: '0 0 12px 12px',
                padding: 1,
              }}
            >
              {commonTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
