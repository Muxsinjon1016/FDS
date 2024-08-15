import { configureStore } from "@reduxjs/toolkit";
import addTo from "./adTo";
// import  from "./searchSlice";
import searchReducer from "./searchReducer";

const store = configureStore({
  reducer: {
    addTo: addTo,
    search: searchReducer,
  },
});

export default store;
