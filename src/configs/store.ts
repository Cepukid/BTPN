import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import rootReducers from '@stores/reducers';
export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    });
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
