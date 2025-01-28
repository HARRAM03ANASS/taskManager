// import {configureStore} from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import {apiSlice} from "./slices/apiSlice";

// const store = configureStore ({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true,
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import {apiSlice} from "./slices/apiSlice";
import authReducer from './slices/authSlice';
import paginationReducer from './slices/paginationSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;