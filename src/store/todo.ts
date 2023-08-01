import { createSlice } from "@reduxjs/toolkit";
import { EditTodo, Todo } from "../types/Todo";
import { GetTodos } from "../api/services";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [] as Todo[],
    editTodo: { todoId: null, title: "", description: "" } as EditTodo,
  },
  reducers: {
    createTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    updateTodoState: (state, action) => {
      const { todoId, title, description } = action.payload as EditTodo;
      state.editTodo = { todoId, title, description };
      console.log(state.editTodo);
    },
    toggleTodoCompleted: (state, action) => {
      const todoId = action.payload;
      const updatedTodos = state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );

      state.todos = updatedTodos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetTodos.fulfilled, (state, action) => {
      const todos = action.payload as Todo[];
      state.todos = todos;
    });
    builder.addCase(GetTodos.rejected, (state, action) => {
      state.todos = [];
    });
  },
});

export const { createTodo, deleteTodo, toggleTodoCompleted, updateTodoState } =
  todoSlice.actions;
export default todoSlice.reducer;
