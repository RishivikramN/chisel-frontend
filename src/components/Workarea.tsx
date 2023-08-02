import { Button, Form, Grid, Icon, Modal, Segment } from "semantic-ui-react";
import Todos from "./Todos";
import { useDispatch, useSelector } from "react-redux";
import { Board, EditBoard } from "../types/Board";
import { COLORS } from "../colors";
import { useEffect, useState } from "react";
import { updateBoardState } from "../store/board";
import { DeleteBoard, UpdateBoard } from "../api/services";
import Cog from "../assets/Settings.svg";

function WorkArea() {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const boards = useSelector((state: any) => state.board.boards) as Board[];
  const activeBoard = useSelector((state: any) => state.board.activeBoard) as {
    id: string;
    title: string;
  };

  const editBoard = useSelector(
    (state: any) => state.board.editBoard
  ) as EditBoard;
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      // Check if the click target is not within the settings div
      if (!event.target.closest(".settings")) {
        setIsSettingOpen(false);
      }
    };

    // Add the click event listener to the document
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleCogIconClick = (event: any) => {
    // Stop the propagation of the click event
    event.stopPropagation();

    // Toggle the isSettingOpen state
    setIsSettingOpen(!isSettingOpen);
  };

  const handleModalOpen = (boardId: string, title: string) => {
    setModalOpen(true);
    dispatch(updateBoardState({ boardId, title }) as any);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    dispatch(updateBoardState({ boardId: null, title: "" }) as any);
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
    setIsSettingOpen(!setIsSettingOpen);
  };

  return (
    <>
      <Grid.Column width={13} style={{ backgroundColor: COLORS.WorkArea }}>
        <div className="workarea-header workarea-header-customize">
          <h2 className="board-heading">{activeBoard?.title}</h2>
          <div className="cog-icon">
            <img
              src={Cog}
              className="cursor-pointer"
              width={30}
              alt="settings"
              onClick={(e) => handleCogIconClick(e)}
            />
            {isSettingOpen && (
              <div className="settings">
                <div
                  className="flex-row setting-item cursor-pointer"
                  onClick={() =>
                    handleModalOpen(activeBoard.id, activeBoard.title)
                  }
                >
                  <Icon className="edit alternate outline " />
                  <div>Edit Board</div>
                </div>
                <div
                  className="flex-row setting-item cursor-pointer"
                  onClick={() => handleDeleteBoard(activeBoard.id)}
                >
                  <Icon className="trash alternate outline" />
                  <div>Delete Board</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="main-content">
          <Segment textAlign="center" vertical>
            {boards.map((board) => (
              <Todos
                id={board.id}
                key={board.id}
                title={board.title}
                visible={board.visible!}
              />
            ))}
          </Segment>
        </div>
      </Grid.Column>

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
          <button
            className="cancel-btn cursor-pointer"
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            className="success-btn cursor-pointer"
            onClick={() => handleEditBoard()}
          >
            Update
          </button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default WorkArea;
