import { createSlice } from "@reduxjs/toolkit";

const csvDataSlice = createSlice({
  name: "csvData",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = csvDataSlice.actions;
export default csvDataSlice.reducer;
