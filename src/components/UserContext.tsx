import { atom, useSetRecoilState } from 'recoil';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import dotenv from 'dotenv';

dotenv.config();
const newOrGetUserUrl = process.env.NEW_OR_GET_USER_URL;

export interface GodInfo {
  user: {
    TelegramID: number;
    Name: string;
    Points: number;
    Referrer: null | string;
    Referrals: number[];
    CurrentGuesses: string[];
    LastGuessTime: string;
  };
  friends: {
    _id: string;
    Name: string;
    Points: number;
  }[];
  leaderboard: {
    topUsers: {
      Name: string;
      Points: number;
      Rank: number;
    }[];
    userRank: number;
  };
}

const userStateKey = `userState${Math.random()}`;

export const userState = atom({
  key: userStateKey,
  default: null as GodInfo | null,
});

export const UserContext = createContext<GodInfo | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GodInfo | null>(null);
  const setUserRecoil = useSetRecoilState(userState);

  const fetchData = async () => {
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
    const result = response.data;
    setUser(result);
    setUserRecoil(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};