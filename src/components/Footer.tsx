import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import Home from '@mui/icons-material/Home';
import { Leaderboard } from '@mui/icons-material';
import Group from '@mui/icons-material/Group';
import Wallet from '@mui/icons-material/Wallet';
import WebApp from '@twa-dev/sdk';
import { StyleRounded } from '@mui/icons-material';


interface Tab {
  id: string;
  text: string;
  Icon: React.ComponentType;
  path: string; // Add a path property for routing
}

const tabs: Tab[] = [
  { id: 'home', text: 'Home', Icon: Home, path: '/' },
  { id: 'leaderboard', text: 'Leaderboard', Icon: Leaderboard, path: '/leaderboard' },
  { id: 'friends', text: 'Friends', Icon: Group, path: '/friends' },
  { id: 'wallet', text: 'Wallet', Icon: Wallet, path: '/wallet' },
];

const Footer: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20, // Add margin to the bottom side
        left: 14,   // Add margin to the left side
        right: 14,  // Add margin to the right side
        borderRadius: '10px',
        display: 'flex', // Make sure the Paper container uses flexbox
        justifyContent: 'center', // Center the BottomNavigation
        backgroundColor: '#272827',
      }}
      elevation={4}
    >
      <BottomNavigation
        sx={{
          width: '100%',  // Take the full width of the Paper
          maxWidth: 600,  // Optional: limit the maximum width
          display: 'flex',
          justifyContent: 'space-between', // Distribute space between items
          backgroundColor: 'transparent',
        }}
        value={currentTab}
        onChange={(event, newValue) => {
          const selectedTab = tabs.find(tab => tab.id === newValue);
          if (selectedTab) {
            setCurrentTab(newValue);
            navigate(selectedTab.path); // Navigate to the selected path
            WebApp.HapticFeedback.impactOccurred('medium');
          }
        }}
      >
        {tabs.map(({ id, text, Icon }) => (
          <BottomNavigationAction
            key={id}
            label={text}
            value={id}
            icon={<Icon />}
            sx={{
              flex: 1,
              minWidth: 0,
              color: '#9A9A9A',
              '&.Mui-selected': {
                color: '#44A9EE',
                fontWeight: 'thin',
                fontSizeAdjust: '0.4',
                fontFamily: 'sans-serif',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
