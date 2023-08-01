import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../types/Board";
import { GetBoards } from "../api/services";
import { EditBoard } from "../types/Board";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [] as Board[],
    loading: false,
    error: null,
    editBoard: { boardId: null, title: "" } as EditBoard,
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

    updateBoardState: (state, action) => {
      const { boardId, title } = action.payload as EditBoard;
      state.editBoard = { boardId, title };
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
  extraReducers: (builder) => {
    builder.addCase(GetBoards.fulfilled, (state, action) => {
      const boards = action.payload as Board[];
      if (boards.length) boards[0].visible = true;
      state.boards = boards;
    });
    builder.addCase(GetBoards.rejected, (state, action) => {
      state.boards = [];
    });
  },
});

export const {
  createBoard,
  deleteBoard,
  toggleBoardVisibility,
  updateBoardState,
} = boardSlice.actions;
export default boardSlice.reducer;
