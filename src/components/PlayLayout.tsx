import React, { useState, useEffect } from 'react';
import { BackButton } from '@twa-dev/sdk/react';
import { Box } from '@mui/material';
import { Token, Help } from '@mui/icons-material';
import { Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WebApp from '@twa-dev/sdk';
import { userState } from './UserContext';
import { useRecoilState } from 'recoil';
import './PlayLayout.css';

interface PlayLayoutProps {
  children: React.ReactNode;
}

const PlayLayout: React.FC<PlayLayoutProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    window.history.back();
    handleClose();
  };

  useEffect(() => {
    const rainContainer = document.querySelector('.rain-container');
    const numRaindrops = 40;

    for (let i = 0; i < numRaindrops; i++) {
      const raindrop = document.createElement('div');
      const top = Math.random() * 100 + 'vh';
      raindrop.classList.add('raindrop');
      raindrop.style.top = top;
      raindrop.style.left = `${Math.random() * 100}%`;
      raindrop.style.animationDelay = `${Math.random() * 2}s`;
      rainContainer?.appendChild(raindrop);
    }
  }, [user?.user?.Points]);

  const handleInfoClick = () => {
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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="rain-container" style={{ flex: 1, overflow: 'hidden', background: 'black', padding: '4px' }}>
        <BackButton onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-description"
          sx={backdropStyle}
        >
          <Box sx={modalStyle}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1rem', color: '#C3C3C3', fontFamily: 'sans-serif', fontWeight: 800 }}>
              Confirm Exit
            </h2>
            <div style={{ marginBottom: '1rem', fontSize: '1rem', color: '#C3C3C3', fontFamily: 'sans-serif' }}>
              This action will exit the game and discard all progress. Are you sure you want to quit?
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleConfirm} style={{ color: '#FF2222' }}>Exit Game</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </div>
          </Box>
        </Modal>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <Box
            display="flex"
            flexDirection='row'
            justifyContent="left"
            alignItems='center'
            marginLeft={2}
            bgcolor='#BC95FE'
            color='black'
            borderRadius={20}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0.1 }}>
              <p style={{ margin: 2, padding: 2, fontWeight: 700 }}>{user?.user.Points}</p>
              <Token />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            marginRight={2}
            color='black'
            style={{ width: '100%', overflow: 'hidden' }}
          >
            <Help onClick={handleInfoClick} style={{ color: '#343534', margin: '0', padding: '0' }} />
          </Box>
        </Box>
        {children}

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
              <img src={require('../assets/question.gif')} alt="Telegram GIF" style={{ width: '25%', height: '25%', }} />
            </div>
            <div style={{ marginBottom: '1rem', fontSize: '1rem', color: '#C3C3C3', fontFamily: 'sans-serif' }}>
              Guess a 5-letter word in 6 attempts or less.
            </div>
            <div style={{ marginBottom: '1rem', fontSize: '1rem', color: '#C3C3C3', fontFamily: 'sans-serif' }}>
              Tokens earned are based on the number of attempts taken to guess the word correctly.
            </div>
          </Box>
        </Modal>
      </div>
    </div >
  );
};

export default PlayLayout;