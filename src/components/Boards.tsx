import { Grid, Icon, Menu } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Board } from "../types/Board";
import { toggleBoardVisibility } from "../store/board";
import { ulid } from "ulid";
import { useEffect } from "react";
import Logo from "../logo.svg";
import { GetBoards, GetTodos, CreateBoard } from "../api/services";

function Boards() {
  const boards = useSelector((state: any) => state.board.boards) as Board[];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetBoards({ dispatch }) as any);
  }, [dispatch]);

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

  return (
    <>
      <Grid.Column width={3}>
        <div className="sidebar">
          <div className="brand-logo flex-row">
            <img src={Logo} alt="logo" width={40} />
            <h1 className="text-primary brand">Untitled</h1>
          </div>
          <div className="boards-container">
            <div className="flex-center padding-x-1 board-action-header">
              <div className="text-600 text-medium font-family text-secondary">
                BOARDS
              </div>
              <Icon
                name="plus"
                className="cursor-pointer"
                onClick={handleCreateBoard}
              />
            </div>
            <div className="scrollable-container">
              {boards.length ? (
                <Menu
                  vertical
                  className="ui vertical fluid  menu"
                  text
                  size="large"
                  borderless
                >
                  {boards.map((board) => (
                    <div
                      key={board.id}
                      className={`board-menu-item font-family cursor-pointer  ${
                        board.visible ? "board-active" : ""
                      }`}
                      onClick={() => handleBoardClick(board.id)}
                    >
                      {board.title}
                    </div>
                  ))}
                </Menu>
              ) : (
                <p> No Boards found</p>
              )}
            </div>
          </div>
        </div>
      </Grid.Column>
    </>
  );
}

export default Boards;
