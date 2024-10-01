import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import globals from './globals';
import hackathon from './hackathon';

const store = configureStore({
  reducer: {
    globals,
    hackathon,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
