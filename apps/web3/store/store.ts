import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

//store
export const store =configureStore({
    reducer:{
      //key: value
      user: userSlice.reducer
    },
  })