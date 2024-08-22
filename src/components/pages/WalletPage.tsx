import React, { useEffect, useState } from 'react';
import { Box, colors, Typography } from '@mui/material';
import TonConnectModal from '../connectors/TonConnectModal';
import { useTonWallet } from '@tonconnect/ui-react';

const WalletPage: React.FC = () => {
  const tonWallet = useTonWallet();
  const [account, setAccount] = useState<string | null>(null);
  const [view, setView] = useState<string>('DISCONNECTED');

  // const tokens = [
  //   { icon: <TokenUSDT size={30} variant="branded" />, name: 'USDT', value: '0.00' },
  //   { icon: <TokenTON size={30} variant="branded" />, name: 'TON', value: '0.00' },
  // ];

  useEffect(() => {
    if (tonWallet) {
      setAccount(tonWallet.account.address);
      setView('CONNECTED');
    }
  }, [tonWallet]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <img src={require('../../assets/duck.gif')} alt="Telegram GIF" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, color: '#E3E3E3', fontSize: 24, fontWeight: 700, fontFamily: 'sans-serif' }}>
        Exciting Things Ahead!
      </div>
      <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, fontFamily: 'sans-serif' }}>
        {view === 'CONNECTED' ? (
          <Typography>
            Connected: {account}
          </Typography>
        ) : (
          <TonConnectModal title="CONNECT TON WALLET" icon="/logo.png" />
        )}
      </div>
      {/* <Box sx={{ marginTop: 2, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
        {tokens.map((token, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: 2,
              backgroundColor: '#232423',
              marginBottom: 2,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div>
                {token.icon}
              </div>
              <div style={{ color: '#E3E3E3', marginLeft: 8, fontSize: 18, fontWeight: 700, fontFamily: 'sans-serif' }}>
                {token.name}
              </div>
            </div>
            <Typography sx={{ color: '#E3E3E3', fontSize: 18, fontFamily: 'sans-serif' }}>
              {token.value}
            </Typography>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

export default WalletPage;
