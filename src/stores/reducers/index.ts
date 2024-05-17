import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {reducer as homeReducer} from '@modules/home/stores/index';
import {PERSIST} from '@configs/persist';
import {contactApi} from '@modules/home/services';

/**
 * persist tidak boleh di pake yg sama klo beda reducers karena akan nimpa
 */
const rootReducers = combineReducers({
  home: persistReducer(PERSIST.homeConfig, homeReducer),
  [contactApi.reducerPath]: contactApi.reducer,
});

export default rootReducers;
