import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';

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
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{ flex: 1 }}
      >
        <Typography sx={{ mb: 0.1, fontSize: '0.85rem', color: '#E3E3E3' }}>
          {task.name}
        </Typography>
        <Typography sx={{ color: '#E3E3E3', fontSize: '0.55rem', display: 'flex', alignItems: 'center' }}>
          <TokenIcon sx={{ fontSize: '0.6rem', mr: 0.25 }} /> {/* Adjust the size of the icon */}
          X {task.tokens}
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ fontSize: '0.55rem', padding: '0.25rem 0.5rem', backgroundColor: '#44A9EE', color: 'white' }}
        >
          Claim
        </Button>
      </Box>
    </Box>
  );
};

const TasksPage: React.FC = () => {
  return (
    <div style={{ flex: 0, overflowY: 'auto' }}>
      <Box sx={{ height: '100vh', padding: 2, overflowY: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Daily Tasks Section */}
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

          {/* Common Tasks Section */}
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
    </div>
  );
};

export default TasksPage;
