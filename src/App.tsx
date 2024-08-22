import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PlayLayout from './components/PlayLayout';
import PlayPage from './components/pages/PlayPage';
import HomePage from './components/pages/HomePage';
import LeaderboardPage from './components/pages/LeaderboardPage';
import FriendsPage from './components/pages/FriendsPage';
import WalletPage from './components/pages/WalletPage';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { UserProvider } from './components/UserContext';
import { RecoilRoot } from 'recoil';
import LoadingPage from './components/pages/LoadingPage';
import dotenv from 'dotenv';

dotenv.config();
const manifestUrl = process.env.REACT_APP_TONCONNECT_MANIFEST_URL;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      await WebApp.expand();
      WebApp.setHeaderColor('#000000');
      WebApp.setBackgroundColor('#000000');
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    loadApp();
  }, []);

  return (
    <RecoilRoot>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <UserProvider>
          {isLoading ? (
            <LoadingPage /> // Render the loading page
          ) : (
            <Router>
              <Routes>
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/leaderboard" element={<Layout><LeaderboardPage /></Layout>} />
                <Route path="/friends" element={<Layout><FriendsPage /></Layout>} />
                <Route path="/wallet" element={<Layout><WalletPage /></Layout>} />
                <Route path="/play" element={<PlayLayout><PlayPage /></PlayLayout>} />
              </Routes>
            </Router>
          )}
        </UserProvider>
      </TonConnectUIProvider>
    </RecoilRoot>
  );
};

export default App;