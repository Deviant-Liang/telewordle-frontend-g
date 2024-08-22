import React from 'react';

const LoadingPage = () => {
  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <img
        src={require('../../assets/loading.gif')}
        alt="Loading..."
        style={{
          width: 100,
          height: 100,
        }}
      />
    </div>
  );
};

export default LoadingPage;