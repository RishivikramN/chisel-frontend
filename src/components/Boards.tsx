import {
  Button,
  Form,
  Grid,
  Icon,
  Menu,
  Modal,
  Segment,
} from "semantic-ui-react";
import Todos from "./Todos";
import { useDispatch, useSelector } from "react-redux";
import { Board, EditBoard } from "../types/Board";
import { toggleBoardVisibility, updateBoardState } from "../store/board";
import { ulid } from "ulid";
import { useEffect, useState } from "react";
import {
  GetBoards,
  GetTodos,
  CreateBoard,
  DeleteBoard,
  UpdateBoard,
} from "../api/services";

function Boards() {
  const boards = useSelector((state: any) => state.board.boards) as Board[];
  const editBoard = useSelector(
    (state: any) => state.board.editBoard
  ) as EditBoard;
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetBoards({ dispatch }) as any);
  }, [dispatch]);

  const handleModalOpen = (boardId: string, title: string) => {
    setModalOpen(true);
    dispatch(updateBoardState({ boardId, title }) as any);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    dispatch(updateBoardState({ boardId: null, title: "" }) as any);
  };
  const handleBoardClick = (boardId: string) => {
    dispatch(GetTodos({ boardId }) as any);
    dispatch(toggleBoardVisibility(boardId));
  };

  const handleCreateBoard = () => {
    const boardTitle = boards.length + 1;
    const newBoard: Board = {
      id: ulid(),
      title: `Board ${boardTitle}`,
    };
    dispatch(CreateBoard({ board: newBoard, dispatch }) as any);
  };

  const handleEditBoard = () => {
    if (editBoard.boardId)
      dispatch(
        UpdateBoard({
          boardId: editBoard.boardId,
          dispatch,
          title: editBoard.title,
        }) as any
      );

    handleModalClose();
  };

  const handleDeleteBoard = (boardId: string) => {
    dispatch(DeleteBoard({ boardId, dispatch }) as any);
  };

  return (
    <Segment className="task-grid-border">
      <Grid columns={2} divided>
        <Grid.Column width={"3"}>
          <h3 className="ui header">Boards</h3>
          <div className="scrollable-container">
            <div className="tasks-container">
              {boards.length ? (
                <Menu vertical className="ui vertical fluid  menu">
                  {boards.map((board) => (
                    <Menu.Item
                      key={board.id}
                      className={`item ${board.visible ? "active" : ""}`}
                      onClick={() => handleBoardClick(board.id)}
                    >
                      {board.title}
                      <Icon
                        className="trash alternate outline cursor-pointer"
                        onClick={() => handleDeleteBoard(board.id)}
                      />
                      <Icon
                        className="edit alternate outline cursor-pointer"
                        onClick={() => handleModalOpen(board.id, board.title)}
                      />
                    </Menu.Item>
                  ))}
                </Menu>
              ) : (
                <p> No Boards found</p>
              )}
            </div>
          </div>
          <Button primary onClick={handleCreateBoard}>
            Add new Board
          </Button>
        </Grid.Column>
        <Grid.Column textAlign="center">
          {boards.map((board) => (
            <Todos
              id={board.id}
              key={board.id}
              title={board.title}
              visible={board.visible!}
              onBoardClick={handleBoardClick}
            />
          ))}
        </Grid.Column>
      </Grid>
      <Modal open={modalOpen} onClose={handleModalClose} size="mini">
        <Modal.Header>Edit Board</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Board Title</label>
              <input
                placeholder="Edit title"
                value={editBoard.title}
                onChange={(e) =>
                  dispatch(
                    updateBoardState({ ...editBoard, title: e.target.value })
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
          <Button positive onClick={() => handleEditBoard()}>
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    </Segment>
  );
}

export default Boards;
