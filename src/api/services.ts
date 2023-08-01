import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Board } from "../types/Board";
import { Todo } from "../types/Todo";

const BASE_URL = "http://localhost:3500";

export const GetBoards = createAsyncThunk(
  "boards/getBoards",
  async (params: { dispatch: any }) => {
    const boards: Board[] = await (await axios.get(`${BASE_URL}/boards`)).data;
    if (boards.length) params.dispatch(GetTodos({ boardId: boards[0].id }));
    return boards;
  }
);

export const CreateBoard = createAsyncThunk(
  "boards/createBoard",
  async (params: { board: Board; dispatch: any }) => {
    await axios.post(`${BASE_URL}/boards`, params.board);
    params.dispatch(GetBoards({ dispatch: params.dispatch }));
  }
);

export const DeleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (params: { boardId: string; dispatch: any }) => {
    await axios.delete(`${BASE_URL}/boards/${params.boardId}`);
    params.dispatch(GetBoards({ dispatch: params.dispatch }));
  }
);
export const UpdateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (params: { boardId: string; title: string; dispatch: any }) => {
    const { boardId, title, dispatch } = params;
    await axios.put(`${BASE_URL}/boards/${boardId}`, { title });
    dispatch(GetBoards({ dispatch: params.dispatch }));
  }
);

export const GetTodos = createAsyncThunk(
  "todo/getTodos",
  async (params: { boardId: string }) => {
    return await (
      await axios.get(`${BASE_URL}/todos?boardId=${params.boardId}`)
    ).data;
  }
);

export const CreateTodo = createAsyncThunk(
  "todo/createTodo",
  async (params: { todo: Todo; boardId: string; dispatch: any }) => {
    const { todo, boardId, dispatch } = params;
    await axios.post(`${BASE_URL}/todos`, { ...todo, boardId });
    dispatch(GetTodos({ boardId }));
  }
);

export const UpdateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (params: { todo: Todo; dispatch: any }) => {
    const { todo, dispatch } = params;
    await axios.put(`${BASE_URL}/todos/${todo.id}`, todo);
    dispatch(GetTodos({ boardId: todo.boardId }));
  }
);

export const ToggleTodoCompleted = createAsyncThunk(
  "todo/toggleTodoCompleted",
  async (params: {
    todoId: string;
    completed: boolean;
    boardId: string;
    dispatch: any;
  }) => {
    const { todoId, completed, boardId, dispatch } = params;
    await axios.patch(`${BASE_URL}/todos/${todoId}`, { completed });
    dispatch(GetTodos({ boardId }));
  }
);

export const DeleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (params: { todoId: string; boardId: string; dispatch: any }) => {
    const { todoId, boardId, dispatch } = params;
    await axios.delete(`${BASE_URL}/todos/${todoId}`);
    dispatch(GetTodos({ boardId }));
  }
);
