import { useState } from "react";
import { Card, Grid, Modal, Form, Icon } from "semantic-ui-react";
import TodoCard from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../types/Todo";
import { ulid } from "ulid";
import { CreateTodo, DeleteTodo, ToggleTodoCompleted } from "../api/services";

interface BoardProps {
  id: string;
  title: string;
  visible: boolean;
}

function Todos({ id, title, visible }: BoardProps) {
  const todos = useSelector((state: any) => state.todo.todos) as Todo[];
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);

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

    if (!newTodoTitle.length || !newTodoDescription.length) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }
    dispatch(CreateTodo({ todo: newTodo, boardId: id, dispatch }) as any);
    setNewTodoTitle("");
    setNewTodoDescription("");
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
    <Grid columns={2} textAlign="center">
      <Grid.Column style={{ display: visible ? "block" : "none" }}>
        <div className="todo-container">
          <div className="flex-center">
            <h3 style={{ marginTop: "24px", marginLeft: "40px" }}>
              <span className="mr-1"> 🎯 </span>To do
            </h3>
            <Icon
              name="plus"
              className="cursor-pointer pr-2"
              onClick={handleModalOpen}
            />
          </div>
          <div className="scrollable-container">
            <div className="tasks-container">
              <Card.Group itemsPerRow={1} stackable centered>
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
                  <p
                    style={{
                      paddingTop: "50%",
                    }}
                  >
                    No Todos Pending
                  </p>
                )}
              </Card.Group>
            </div>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column style={{ display: visible ? "block" : "none" }}>
        <div className="todo-container">
          <div className="flex-center">
            <h3
              style={{
                marginTop: "24px",
                marginLeft: "40px",
                marginBottom: "10px",
              }}
            >
              <span className="mr-1"> ✅ </span>Done
            </h3>
          </div>
          <div className="scrollable-container">
            <div className="tasks-container">
              <Card.Group itemsPerRow={1} stackable centered>
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
                  <p
                    style={{
                      paddingTop: "50%",
                    }}
                  >
                    {"Nothing to show"}
                  </p>
                )}
              </Card.Group>
            </div>
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
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea
                placeholder="Enter task description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                required
              />
            </Form.Field>
          </Form>
          {inputError && (
            <p className="input-error">
              Please enter both title and description
            </p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <button
            className="cancel-btn cursor-pointer"
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            className="success-btn cursor-pointer"
            onClick={handleCreateTask}
          >
            Create Task
          </button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
}

export default Todos;
