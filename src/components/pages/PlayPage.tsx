import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import Grid from '../wordle/Grid';
import Keyboard from '../wordle/Keyboard';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { userState, GodInfo } from '../UserContext';
import { useRecoilState } from 'recoil';
import dotenv from 'dotenv';

dotenv.config();
const newOrGetUserUrl = process.env.NEW_OR_GET_USER_URL;

const PlayPage: React.FC = () => {
  const [board, setBoard] = useState<string[][]>(Array(6).fill(Array(5).fill('')));
  const [feedback, setFeedback] = useState<string[][]>(Array(6).fill(Array(5).fill('#1E1F1E')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [shakeRow, setShakeRow] = useState(-1);
  const [user, setUser] = useRecoilState(userState);
  const [loseModalOpen, setLoseModalOpen] = useState(false);
  const [winModalOpen, setWinModalOpen] = useState(false);

  const handleLoseModalOpen = () => {
    setLoseModalOpen(true);
  };
  const handleLoseModalClose = () => {
    setLoseModalOpen(false);
  };
  const handleWinModalOpen = () => {
    setWinModalOpen(true);
  };
  const handleWinModalClose = () => {
    setWinModalOpen(false);
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 230,
    bgcolor: 'black',
    color: '#C3C3C3',
    boxShadow: 24,
    borderRadius: '10px',
    p: 2,
  };

  const backdropStyle = {
    backdropFilter: 'blur(3px)',
  };

  const handleKeyPress = async (key: string) => {
    if (key === 'ENTER' && currentCol === 5) {
      const typedWord = board[currentRow].join('');
      try {
        const API_URL = {guessUrl};
        const response = await axios.post<{ result: string, guess: string, correct: boolean, pointsEarned: number, correctWord: string }>(API_URL, { userId: WebApp.initDataUnsafe.user?.id ?? -999999999, guess: typedWord.toLowerCase() });
        const result = response.data;

        const feedbackRow = result.result.split('').map((item, index) => {
          switch (item) {
            case 'o':
              return '#439a30';
            case '/':
              return '#bcb620';
            case 'x':
              return '#454645';
            default:
              return 'gray';
          }
        });

        setFeedback((prevFeedback) => {
          const newFeedback = [...prevFeedback];
          newFeedback[currentRow] = feedbackRow;
          return newFeedback;
        });

        setCurrentRow((prevRow) => (prevRow < 6 ? prevRow + 1 : prevRow));
        setCurrentCol(0);

        if (result.correct || currentRow === 5) {
          if (result.correct) {
            handleWinModalOpen();
            //////////////////////////////////////////////
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
            setUser(response.data);
            //////////////////////////////////////////////
          } else {
            handleLoseModalOpen();
          }

          setCurrentRow(0);
          setCurrentCol(0);
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard.forEach((row, index) => {
              newBoard[index] = Array(5).fill('');
            });
            return newBoard;
          });
          setFeedback((prevFeedback) => {
            const newFeedback = [...prevFeedback];
            newFeedback.forEach((row, index) => {
              newFeedback[index] = Array(5).fill('#1E1F1E');
            });
            return newFeedback;
          });
        }
      } catch (error) {
        setShakeRow(currentRow);
        setTimeout(() => {
          setShakeRow(-1);
        }, 500);
      }
    } else if (key === 'BACKSPACE' && currentCol > 0) {
      setCurrentCol((prevCol) => prevCol - 1);
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        const updatedRow = [...newBoard[currentRow]];
        updatedRow[currentCol - 1] = '';
        newBoard[currentRow] = updatedRow;
        return newBoard;
      });
    } else if (currentCol < 5 && key.length === 1) {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        const updatedRow = [...newBoard[currentRow]];
        updatedRow[currentCol] = key;
        newBoard[currentRow] = updatedRow;
        return newBoard;
      });
      setCurrentCol((prevCol) => (prevCol < 5 ? prevCol + 1 : prevCol));
    }
  };

  return (
    useEffect(() => {
      setShakeRow(-1);
    }, [shakeRow]),

    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      style={{ boxSizing: 'border-box' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        marginTop={1.5}
        style={{ flex: '1 1 auto', overflow: 'hidden' }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flex="2 1 0"
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <Grid board={board} feedback={feedback} shakeRow={shakeRow} />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="top"
          flex="1 1 0"
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <Keyboard onKeyPress={handleKeyPress} />
        </Box>
      </Box>
      {/* Modal */}
      <Modal
        open={loseModalOpen}
        onClose={handleLoseModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={backdropStyle}
      >
        <Box sx={modalStyle}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <img src={require('../../assets/lose.gif')} alt="Telegram GIF" style={{ width: '100%', height: '100%', }} />
          </div>
          <div style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 700, color: '#C3C3C3', fontFamily: 'sans-serif', textAlign: 'center' }}>
            YOU LOSE...
          </div>
        </Box>
      </Modal>

      <Modal
        open={winModalOpen}
        onClose={handleWinModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={backdropStyle}
      >
        <Box sx={modalStyle}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <img src={require('../../assets/win.gif')} alt="Telegram GIF" style={{ width: '100%', height: '100%', }} />
          </div>
          <div style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 700, color: '#C3C3C3', fontFamily: 'sans-serif', textAlign: 'center' }}>
            YOU WIN!
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default PlayPage;
