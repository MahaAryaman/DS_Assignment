import React, {useCallback, useEffect, useState} from 'react';
import {IAppModel} from '../models/IAppModel';
import AsyncStorageServices from '../localStorage/asyncStorageServices';
import {ACCESS_TOKEN, IS_PROFILE_COMPLETED} from '../localStorage/constants';

const AppContext = React.createContext<IAppModel>({
  isUserLoggedIn: false,
  setUserLoggedIn: (_value: boolean) => {},
});

const AppProvider = (props: any) => {
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const isLoggedIn = async () => {
    const token = (await AsyncStorageServices.getItem(ACCESS_TOKEN)) ?? null;
    console.log("token", token);
    if (token != null) {
      AsyncStorageServices.setItem(IS_PROFILE_COMPLETED, true);
      setUserLoggedIn(true);
    } else {
      AsyncStorageServices.setItem(IS_PROFILE_COMPLETED, false);
      setUserLoggedIn(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AppContext.Provider
      value={{
        isUserLoggedIn,
        setUserLoggedIn,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
