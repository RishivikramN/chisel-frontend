import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/Todo";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [] as Todo[],
  },
  reducers: {
    createTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    toggleTodoCompleted: (state, action) => {
      const todoId = action.payload;
      const updatedTodos = state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );

      state.todos = updatedTodos;
    },
  },
});

export const { createTodo, deleteTodo, toggleTodoCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
