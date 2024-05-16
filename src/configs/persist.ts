import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';
import {STORE_ID, STORE_KEY} from './constants';
import {toString} from 'lodash';

export const storage = new MMKV({
  id: `${toString(STORE_ID)}`,
  encryptionKey: toString(STORE_KEY),
});

export const reduxStorage: Storage = {
  setItem: (key: any | undefined, value: any | undefined) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: any | undefined) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: any | undefined) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const PERSIST = {
  active: true,
  reducerVersion: '1.0',
  homeConfig: {
    key: 'home',
    storage: reduxStorage,
  },
};
