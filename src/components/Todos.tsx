import { useState } from "react";
import { Card, Grid, Modal, Button, Form } from "semantic-ui-react";
import TodoCard from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../types/Todo";
import { ulid } from "ulid";
import { CreateTodo, DeleteTodo, ToggleTodoCompleted } from "../api/services";
interface BoardProps {
  id: string;
  title: string;
  visible: boolean;
  onBoardClick: (boardId: string) => void;
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
      id: ulid(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
      boardId: id,
    };
    setNewTodoTitle("");
    setNewTodoDescription("");
    dispatch(CreateTodo({ todo: newTodo, boardId: id, dispatch }) as any);
    handleModalClose();
  };
  const handleDeleteTask = (todoId: string) => {
    dispatch(DeleteTodo({ boardId: id, dispatch, todoId }) as any);
  };
  const handleToggleCompleted = (todoId: string, isCompleted: boolean) => {
    dispatch(
      ToggleTodoCompleted({
        boardId: id,
        dispatch,
        todoId,
        completed: isCompleted,
      }) as any
    );
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
                    boardId={id}
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
                    boardId={id}
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
