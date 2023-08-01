import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../types/Board";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [] as Board[],
  },
  reducers: {
    createBoard: (state, action) => {
      const updatedBoards = state.boards.map((board) => ({
        ...board,
        visible: false,
      }));
      const newBoard = {
        ...action.payload,
        visible: true,
      };

      state.boards = [...updatedBoards, newBoard];
    },
    deleteBoard: (state, action) => {
      const boardId = action.payload;
      const updatedBoards = state.boards.filter(
        (board) => board.id !== boardId
      );
      updatedBoards.map((board) => (board.visible = false));

      if (updatedBoards.length > 0) {
        updatedBoards[0].visible = true;
      }

      state.boards = [...updatedBoards];
      console.log({ brd: state.boards });
    },
    toggleBoardVisibility: (state, action) => {
      const boardId = action.payload;
      state.boards = state.boards.map((board) =>
        board.id === boardId
          ? { ...board, visible: !board.visible }
          : { ...board, visible: false }
      );
    },
  },
});

export const { createBoard, deleteBoard, toggleBoardVisibility } =
  boardSlice.actions;
export default boardSlice.reducer;
