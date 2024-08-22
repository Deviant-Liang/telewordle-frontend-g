import React from 'react';

type Props = {
  title: string;
  icon: string;
  callback: () => void;
};

const ConnectButton: React.FC<Props> = ({ title, icon, callback }) => {
  return (
    <div 
      onClick={callback}
      style={{
        backgroundColor: '#44A9EE',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.7rem',
        cursor: 'pointer',
        width: '75%',
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '0.5rem',
        }}
      >
        {/* {<TokenTON size={25} variant="branded" />} */}
      </div>
      <div 
        style={{
          textAlign: 'center', 
          fontSize: '1rem',
          fontWeight: 600,
          color: 'black',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default ConnectButton;
