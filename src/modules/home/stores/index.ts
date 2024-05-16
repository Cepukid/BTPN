import {createSlice} from '@reduxjs/toolkit';
import initialState from './homeInitialState';

const HomeSlice = createSlice({
  name: 'Home',
  initialState,
  reducers: {},
});

export const {name, actions, reducer} = HomeSlice;
