import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Stack, Box, Paper, Modal, Button, Icon } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import CloseIcon from '@mui/icons-material/Close';
import WebApp from '@twa-dev/sdk';
import { useRecoilState } from 'recoil';
import { userState } from './UserContext';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
}

const Header: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
    setUser(user);
  }, [user?.user]);

  const getUserNameFirstLetter = () => {
    if (userData) {
      return userData.first_name.charAt(0).toUpperCase();
    }
    return '?';
  };

  const getTokens = () => {
    if (user) {
      return user.user.Points.toLocaleString();
    }
  }

  const handleAvatarClick = () => {
    setModalOpen(true);
    WebApp.HapticFeedback.impactOccurred('medium');
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 230,
    bgcolor: '#161616',
    color: '#C3C3C3',
    boxShadow: 24,
    borderRadius: '10px',
    p: 2,
  };

  const backdropStyle = {
    backdropFilter: 'blur(3px)',
  };

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          top: 6,
          left: 6,
          right: 6,
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
        elevation={4}
      >
        <AppBar position="static" sx={{ boxShadow: 1, borderRadius: '4px', backgroundColor: '#1F1F1F', minHeight: '48px' }}>
          <Toolbar sx={{ minHeight: '48px', padding: '0 8px' }}>
            <Stack direction="row" alignItems="center" spacing={1.2} sx={{ width: '100%' }}>
              {/* Avatar on the left side */}
              <IconButton edge="start" size="small" onClick={handleAvatarClick}>
                <Avatar
                  alt="User Avatar"
                  sx={{
                    width: 35,
                    height: 35,
                    borderRadius: '50%',
                    backgroundColor: '#BC95FE',
                    color: '#1B1B1B',
                    fontWeight: 'bold',
                  }}
                >
                  {getUserNameFirstLetter()}
                </Avatar>
              </IconButton>

              {/* Tokens beside the avatar */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1px 8px',
                  borderRadius: 20,
                  bgcolor: 'black',
                  color: '#BC95FE',
                  fontWeight: 'bold',
                  boxShadow: 1,
                  gap: 0.95,
                }}
              >
                <Typography sx={{ fontSize: '0.75rem' }}>{getTokens()}</Typography> {/* Number of tokens */}
                <TokenIcon />
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
      </Paper>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={backdropStyle}
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#C3C3C3',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar
            alt="User Avatar"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#BC95FE',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {getUserNameFirstLetter()}
          </Avatar>
          <div style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem', color: '#C3C3C3' }}>
            {userData?.first_name}
          </div>
          <div style={{ marginTop: '1rem', color: '#C3C3C3', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              ID
            </div>
            <div>
              {userData?.id}
            </div>
          </div>
          <div style={{ marginTop: '0.1rem', color: '#C3C3C3', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Tokens
            </div>
            <div>
              {user?.user?.Points}
            </div>
          </div>
          <div style={{ marginTop: '0.1rem', color: '#C3C3C3', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Referrals
            </div>
            <div>
              {user?.user?.Referrals.length}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
