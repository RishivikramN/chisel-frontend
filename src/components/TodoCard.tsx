import { useState } from "react";
import { Button, Card, Form, Icon, Modal } from "semantic-ui-react";
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
      <Card>
        <Card.Content>
          <div className="flex-center">
            <div>
              <Card.Header className="text-bold">{title}</Card.Header>
              <Card.Description>{description}</Card.Description>
            </div>
            <div className="flex-center">
              {!completed && (
                <input
                  type="checkbox"
                  onChange={(e) => onCheckboxChange(id, e.target.checked)}
                />
              )}
              <div className="pl-2">
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
          </div>
        </Card.Content>
      </Card>
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
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleModalClose}>
            Cancel
          </Button>
          <Button positive onClick={handleEditTodo}>
            Update Todo
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default TodoCard;
