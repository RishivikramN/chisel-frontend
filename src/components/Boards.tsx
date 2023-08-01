import { Button, Grid, Icon, Menu, Segment } from "semantic-ui-react";
import Todos from "./Todos";
import { useDispatch, useSelector } from "react-redux";
import { Board } from "../types/Board";
import {
  createBoard,
  deleteBoard,
  toggleBoardVisibility,
} from "../store/board";

function Boards() {
  const boards = useSelector((state: any) => state.board.boards) as Board[];
  const dispatch = useDispatch();

  const handleBoardClick = (boardId: number) => {
    dispatch(toggleBoardVisibility(boardId));
  };

  const handleCreateBoard = () => {
    const newBoardId = boards.length + 1;
    const newBoard = {
      id: newBoardId,
      title: `Board ${newBoardId}`,
    };
    dispatch(createBoard(newBoard));
  };

  const handleDeleteBoard = (boardId: number) => {
    dispatch(deleteBoard(boardId));
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
              visible={board.visible}
              onBoardClick={handleBoardClick}
            />
          ))}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default Boards;
