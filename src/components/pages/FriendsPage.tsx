import React, { useEffect } from 'react';
import { Box, Button, Icon } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Check, People } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import TokenIcon from '@mui/icons-material/Token';
import WebApp from '@twa-dev/sdk';
import { useRecoilState } from 'recoil';
import { userState } from '../UserContext';
import dotenv from 'dotenv';

dotenv.config();
const newOrGetUserUrl = process.env.NEW_OR_GET_USER_URL;

const FriendPage: React.FC = () => {
  const shareLink = `https://t.me/telewordle_bot/telewordle?startapp=${WebApp.initDataUnsafe.user?.id}`;
  const description = 'Join TeleWordle!';
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareLink)}%0A%0A${encodeURIComponent(description)}`;
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setUser(user);
  }, [user?.friends]);

  const handleShare = () => {
    window.open(telegramShareUrl, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        console.log('Link copied to clipboard');
        <Alert icon={<Check fontSize="inherit" />} severity="success">
          Link copied to clipboard
        </Alert>
      }
      )
      .catch(error => console.error('Error copying link', error));
  };

  return (
    <div style={{ height: '100vh', flexDirection: 'column', overflow: 'hidden', padding: '1rem' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={1}
        sx={{ maxWidth: 'sm', mx: 'auto' }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{ width: '100%' }}
        >
          <Button
            variant="contained"
            onClick={handleShare}
            startIcon={<People />}
            style={{ flex: 10, height: '44px' }}
            sx={{
              color: 'black',
              backgroundColor: '#44A9EE',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
            }}
          >
            Invite a friend
          </Button>
          <Button
            variant="outlined"
            onClick={handleCopy}
            endIcon={<FileCopyIcon />}
            style={{
              flex: 1,
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 16px',
            }}
            sx={{
              color: '#44A9EE',
              '& .MuiButton-endIcon': {
                marginLeft: 0,
              },
            }}
          >
          </Button>
        </Box>

        <div style={{ marginTop: '2rem', marginBottom: '0.75rem', width: '100%' }}>
          <div style={{
            color: '#E3E3E3',
            fontWeight: 'bold',
            textAlign: 'left',
            paddingLeft: '0.5rem',
            fontFamily: 'sans-serif'
          }}>
            List of your friends ({user?.friends?.length ?? 0})
          </div>
        </div>

        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 275px)',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            WebkitScrollbar: {
              display: 'none',
            } as React.CSSProperties,
            paddingX: 2,
            borderColor: 'divider',
          }}
        >
          <Box>
            {user?.friends?.map(friend => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1px 6px',
                  borderRadius: 3,
                  bgcolor: '#252625',
                  color: '#E3E3E3',
                  fontWeight: 'semibold',
                  fontFamily: 'sans-serif',
                  boxShadow: 1,
                }}
              >
                <Box>
                  <p style={{ margin: '1rem' }}>{friend.Name}</p>
                </Box>
                <Box>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>
                    <p style={{ margin: '0.5rem' }}>{friend.Points}</p> {/* Remove margin for better alignment */}
                    <Icon>
                      <TokenIcon />
                    </Icon>
                  </div>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default FriendPage;
