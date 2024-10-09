import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HackathonMessage } from '@/pages/hackathon/type';

interface State {
  loading: boolean;
  messages: HackathonMessage[];
  activeMessage: HackathonMessage | null;
}

const initialState: State = {
  loading: false,
  messages: [],
  activeMessage: null,
};

const slice = createSlice({
  name: 'hackathon',
  initialState,
  reducers: {
    setHackathonLoading(state, action: PayloadAction<State['loading']>) {
      state.loading = action.payload;
    },
    setMessages(state, action: PayloadAction<State['messages']>) {
      state.messages = action.payload;
    },
    setUpdateMessage(state, action: PayloadAction<{ id: string } & Partial<Omit<HackathonMessage, 'id'>>>) {
      const message = state.messages.find((m) => m.id === action.payload.id);
      if (message) {
        Object.assign(message, action.payload);
      }
    },
    setActiveMessage(state, action: PayloadAction<State['activeMessage']>) {
      state.activeMessage = action.payload;
    },
  },
});

export const { setHackathonLoading, setMessages, setUpdateMessage, setActiveMessage } = slice.actions;
export default slice.reducer;
