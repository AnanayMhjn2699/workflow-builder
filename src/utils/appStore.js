import csvDataReducer from "./csvDataSlice";
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
  reducer: {
    csvData: csvDataReducer,
  },
});
export default appStore;
