import { useState } from "react";
import { Form, Icon, Modal } from "semantic-ui-react";
import { UpdateTodo } from "../api/services";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoState } from "../store/todo";
import { EditTodo } from "../types/Todo";

interface TodoCardProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  boardId: string;
  onCheckboxChange: (todoId: string, isCompleted: boolean) => void;
  onDelete: (todoId: string) => void;
}

function TodoCard({
  id,
  title,
  description,
  completed,
  boardId,
  onCheckboxChange,
  onDelete,
}: TodoCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const editTodo = useSelector((state: any) => state.todo.editTodo) as EditTodo;
  const dispatch = useDispatch();
  const handleModalOpen = (todoId: string) => {
    dispatch(
      updateTodoState({ todoId, title: title, description: description }) as any
    );
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    dispatch(
      updateTodoState({ todoId: null, title: "", description: "" }) as any
    );
  };

  const handleEditTodo = () => {
    if (!editTodo.title.length || !editTodo.description.length) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }
    if (editTodo.todoId)
      dispatch(
        UpdateTodo({
          dispatch,
          todo: {
            boardId: boardId,
            completed,
            description: editTodo.description,
            id: editTodo.todoId,
            title: editTodo.title,
          },
        }) as any
      );

    handleModalClose();
  };
  return (
    <>
      <div className="custom-card">
        <div className="card-action">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
            }}
          >
            {!completed ? (
              <input
                type="checkbox"
                onChange={(e) => onCheckboxChange(id, e.target.checked)}
                style={{ padding: "8px" }}
              />
            ) : (
              <div style={{ width: "13px" }} />
            )}
            <div className="card-title">
              {title.length > 22 ? `${title.substring(0, 21)}...` : title}
            </div>
          </div>

          <div className="action-content-hover">
            {!completed && (
              <Icon
                className="edit alternate outline cursor-pointer"
                onClick={() => handleModalOpen(id)}
              />
            )}
            <Icon
              className="trash alternate outline cursor-pointer"
              onClick={() => onDelete(id)}
            />
          </div>
        </div>
        {/** description */}
        <div>
          <div className="card-description">{description}</div>
        </div>
      </div>
      <Modal open={modalOpen} onClose={handleModalClose} size="mini">
        <Modal.Header>Update the Task</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Edit task title"
                value={editTodo?.title}
                onChange={(e) =>
                  dispatch(
                    updateTodoState({ ...editTodo, title: e.target.value })
                  )
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea
                placeholder="Enter task description"
                value={editTodo?.description}
                onChange={(e) =>
                  dispatch(
                    updateTodoState({
                      ...editTodo,
                      description: e.target.value,
                    })
                  )
                }
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
            onClick={handleEditTodo}
          >
            Update Todo
          </button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default TodoCard;
