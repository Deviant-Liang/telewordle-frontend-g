import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Forward } from '@mui/icons-material';
import WebApp from '@twa-dev/sdk';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

const onHapticFeedback = () => {
  WebApp.HapticFeedback.impactOccurred('light');
};

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  return (
    <div style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" mt={1}>
        {keys.map((row, rowIndex) => (
          <Box key={rowIndex} display="flex" justifyContent="center" gap={0.85} mb={1}
            sx={{ fontFamily: 'sans-serif', fontSize: '0.8rem' }}
          >
            {row.map((key) =>
              key === 'BACKSPACE' ? (
                <Button
                  key={key}
                  variant="contained"
                  onClick={() => {
                    onHapticFeedback();
                    onKeyPress('BACKSPACE');
                  }}
                  sx={{
                    width: '48px',
                    height: '44px',
                    minWidth: '33px',
                    bgcolor: '#444444',
                    color: '#E3E3E3',
                    padding: 0,
                    '&:active': {
                      bgcolor: '#666666',
                      transition: 'background-color 0.1s',
                    },
                  }}
                >
                  <BackspaceIcon sx={{ fontSize: '1rem' }} />
                </Button>
              ) : key === 'ENTER' ? (
                <Button
                  key={key}
                  variant="contained"
                  onClick={() => {
                    onHapticFeedback();
                    onKeyPress('ENTER');
                  }}
                  sx={{
                    width: '48px',
                    height: '44px',
                    minWidth: '33px',
                    bgcolor: '#444444',
                    color: '#E3E3E3',
                    fontSize: 'small',
                    textTransform: 'none',
                    padding: 0,
                    '&:active': {
                      bgcolor: '#666666',
                      transition: 'background-color 0.1s',
                    },
                  }}
                >
                  <Forward sx={{ fontSize: '1.5rem' }} />
                </Button>
              ) : (
                <Button
                  key={key}
                  variant="contained"
                  onClick={() => {
                    onHapticFeedback();
                    onKeyPress(key);
                  }}
                  sx={{
                    width: '32px',
                    height: '44px',
                    minWidth: '22px',
                    bgcolor: '#444444',
                    color: '#E3E3E3',
                    padding: 0,
                    '&:active': {
                      bgcolor: '#666666',
                      transition: 'background-color 0.1s',
                    },
                  }}
                >
                  {key}
                </Button>
              )
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Keyboard;