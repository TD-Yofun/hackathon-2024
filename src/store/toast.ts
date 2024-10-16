import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType =
  | {
      type: 'error';
      id: string;
      title: string;
      autoClose?: boolean;
    }
  | {
      type: 'success';
      id: string;
      title: string;
      autoClose: true;
    };

interface State {
  toastQueue: ToastType[];
}

const initialState: State = {
  toastQueue: [],
};

const slice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<ToastType>) {
      state.toastQueue.push(action.payload);
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toastQueue = state.toastQueue.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = slice.actions;
export default slice.reducer;
