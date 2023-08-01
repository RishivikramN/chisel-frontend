import React, { useState } from "react";
import { Card, Grid, Modal, Button, Form } from "semantic-ui-react";
import TodoCard from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../types/Todo";
import { createTodo, deleteTodo, toggleTodoCompleted } from "../store/todo";
interface BoardProps {
  id: number;
  title: string;
  visible: boolean;
  onBoardClick: (boardId: number) => void;
}

function Todos({ id, title, visible }: BoardProps) {
  const todos = useSelector((state: any) => state.todo.todos) as Todo[];
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setNewTodoTitle("");
    setNewTodoDescription("");
  };
  const handleCreateTask = () => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
      boardId: id,
    };
    setNewTodoTitle("");
    setNewTodoDescription("");
    dispatch(createTodo(newTodo));
    handleModalClose();
  };
  const handleDeleteTask = (todoId: number) => {
    dispatch(deleteTodo(todoId));
  };
  const handleToggleCompleted = (todoId: number) => {
    dispatch(toggleTodoCompleted(todoId));
  };

  const newTodos = todos.filter(
    (todo) => !todo.completed && todo.boardId === id
  );
  const completedTodos = todos.filter(
    (todo) => todo.completed && todo.boardId === id
  );
  return (
    <Grid columns={2} textAlign="center" divided>
      <Grid.Column style={{ display: visible ? "block" : "none" }}>
        <h3 className="ui header">Todo</h3>
        <div className="scrollable-container">
          <div className="tasks-container">
            <Card.Group>
              {newTodos.length ? (
                newTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    completed={todo.completed}
                    onCheckboxChange={handleToggleCompleted}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <div>No Todos Pending</div>
              )}
            </Card.Group>
          </div>
        </div>
        <Button primary onClick={handleModalOpen}>
          Create new Task
        </Button>
      </Grid.Column>
      <Grid.Column style={{ display: visible ? "block" : "none" }}>
        <h3 className="ui header">Done</h3>
        <div className="scrollable-container">
          <div className="tasks-container">
            <Card.Group>
              {completedTodos.length ? (
                completedTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    completed={todo.completed}
                    onCheckboxChange={handleToggleCompleted}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <p>{"Nothing is completed :("}</p>
              )}
            </Card.Group>
          </div>
        </div>
      </Grid.Column>

      <Modal open={modalOpen} onClose={handleModalClose} size="mini">
        <Modal.Header>Create a New Task</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Enter task title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea
                placeholder="Enter task description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleModalClose}>
            Cancel
          </Button>
          <Button positive onClick={handleCreateTask}>
            Create Task
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
}

export default Todos;
