import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board";
import todoReducer from "./todo";

export default configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
  },
});
