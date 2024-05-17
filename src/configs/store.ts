import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import rootReducers from '@stores/reducers';
import {contactApi} from '@modules/home/services/index';
import {setupListeners} from '@reduxjs/toolkit/query';
export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
setupListeners(store.dispatch);
