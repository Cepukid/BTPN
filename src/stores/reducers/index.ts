import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {reducer as homeReducer} from '@modules/home/stores/index';
import {PERSIST} from '@configs/persist';

/**
 * persist tidak boleh di pake yg sama klo beda reducers karena akan nimpa
 */
const rootReducers = combineReducers({
  home: persistReducer(PERSIST.homeConfig, homeReducer),
});

export default rootReducers;
