import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import explore from './explore';
import globals from './globals';
import hackathon from './hackathon';
import toast from './toast';

const store = configureStore({
  reducer: {
    globals,
    explore,
    hackathon,
    toast,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
