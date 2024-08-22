import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './Grid.css';

interface GridProps {
  board: string[][];
  feedback: string[][]; // Add feedback colors
  shakeRow: number;
}

const Grid: React.FC<GridProps> = ({ board, feedback, shakeRow }) => {
  useEffect(() => {
    if (shakeRow !== -1) {
      const startIndex = shakeRow * 5;
      const endIndex = startIndex + 5;
      for (let i = startIndex; i < endIndex; i++) {
        const box = document.querySelector(`#grid-${i}`);
        if (box) {
          box.classList.add('shake-animation');
          setTimeout(() => {
            box.classList.remove('shake-animation');
          }, 500);
        }
      }
    }
  }, [shakeRow]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100%'
      overflow='hidden'
    >
      <Box
        display='grid'
        gap='15px'
        width='100%'
        maxWidth='300px'
        maxHeight='360px'
        justifyContent='center'
        alignItems='center'
        gridTemplateColumns='repeat(5, 1fr)'
        gridTemplateRows='repeat(6, 1fr)'
      >
        {board.flat().map((cell, index) => (
          <Box
            id={`grid-${index}`} // Add the ID here
            key={index}
            display='flex'
            alignItems='center'
            justifyContent='center'
            bgcolor={feedback[Math.floor(index / 5)][index % 5]}
            color='#E3E3E3'
            borderRadius='3px'
            sx={{
              aspectRatio: '1 / 1',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h6' sx={{ fontWeight: 900, fontSize: '42px' }}>{cell}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Grid;
