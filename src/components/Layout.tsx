import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <AppBar
        position="static"
        sx={{ boxShadow: 0, height: '60px' }}
        style={{ background: 'black' }}
      >
        <Toolbar style={{ background: 'black' }}>
          <Header />
        </Toolbar>
      </AppBar>

      <div style={{ flex: 1, overflowY: 'hidden', background: 'black', padding: '4px' }}>
        {children}
      </div>

      <AppBar
        position="static"
        sx={{ boxShadow: 0, height: '85px' }}
        style={{ background: 'black' }}
      >
        <Toolbar style={{ background: 'black' }}>
          <Footer />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
