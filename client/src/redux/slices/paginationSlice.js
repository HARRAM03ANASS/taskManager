import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPages: {}
  },
  reducers: {
    setCurrentPage: (state, action) => {
      const { status, page } = action.payload;
      state.currentPages[status || 'all'] = page;
    }
  }
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;