import React, { useEffect, useState } from 'react';
import { Box, Icon } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token'; // Replace with the appropriate icon
import { WorkspacePremium } from '@mui/icons-material';

import { useRecoilState } from 'recoil';
import { userState } from '../UserContext';

const LeaderBoardPage: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setUser(user);
  }, [user?.leaderboard, user?.user.Points]);

  const topList = [...(user?.leaderboard?.topUsers || [])];

  const myRank = user?.leaderboard?.userRank || -1;
  const myName = user?.user?.Name || "Unknown";

  const compareAndHighlight = (user: { Name: string; Points: number; Rank: number }) => {
    if (user.Name === myName && user.Rank === myRank) {
      return true;
    }
    return false;
  };

  if (user?.leaderboard?.userRank || -1 > topList.length) {
    const existingUserIndex = topList.findIndex((player) => player.Rank === myRank && player.Name === user?.user?.Name);
    if (existingUserIndex === -1) { // Does not exist in the list
      topList.push({ Name: user?.user?.Name || "Unknown", Points: user?.user?.Points || 0, Rank: myRank });
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div>
        <Box
          display="flex"
          flexDirection='row'
          alignItems="center"
          justifyContent="center"
          mx={0.25}
          sx={{
            padding: '2px 16px',
            borderRadius: 1.5,
            position: 'sticky',
            bgcolor: '#44A9EE',
          }}
        >
          <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <WorkspacePremium sx={{ fontSize: '60px', color: 'black' }} />
          </Box>
          <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
              TOP RANKING LIST
            </h2>
          </Box>
        </Box>
      </div>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ maxWidth: 'sm', mx: 'auto', marginX: '1rem' }}
        >
          <Box
            sx={{
              width: '100%',
              height: 'calc(100vh - 230px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              WebkitScrollbar: {
                display: 'none',
              } as React.CSSProperties,
              padding: 2,
              borderColor: 'divider',
            }}
          >
            <Box>
              {topList.map((user, index) => {
                const isHighlighted = compareAndHighlight(user);
                return (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    sx={{
                      padding: '8px 16px',
                      borderRadius: 3,
                      boxShadow: 1,
                      color: '#C3C3C3',
                      bgcolor: '#252625',
                      fontFamily: 'sans-serif',
                      ...(isHighlighted && {
                        position: 'sticky',
                        top: 0,
                        bottom: 5,
                        zIndex: 1,
                        fontWeight: 'bold',
                        backgroundColor: '#BC95FE',
                        color: 'black',
                      }),
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flex: 2 }}>
                          <p style={{ margin: 0, padding: 0, fontSize: 'medium' }}>{user.Name}</p>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'left', fontSize: 'small' }}>
                          <p style={{ margin: 0, padding: '0 2px' }}>{user.Points}</p>
                          <Icon>
                            <TokenIcon style={{ fontSize: 'medium', justifyContent: 'center', alignItems: 'center', marginBottom: '2px' }} />
                          </Icon>
                        </Box>
                      </div>
                    </div>
                    <Box sx={{ flex: 1, textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: 'large' }}>{user.Rank}</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
