export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  boardId: string;
}

export interface EditTodo {
  todoId: string | null;
  title: string;
  description: string;
}
