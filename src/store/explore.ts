import mockData from '@/../mock-server/mock-datas/explore-list.json';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ExploreItem = (typeof mockData._embedded.artifacts)[0];

interface State {
  data: ExploreItem[];
}

const initialState: State = {
  data: mockData._embedded.artifacts,
};

const slice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    setExploreData(state, action: PayloadAction<State['data']>) {
      state.data = action.payload;
    },
  },
});

export const { setExploreData } = slice.actions;
export default slice.reducer;
