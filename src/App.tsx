import { Grid } from "semantic-ui-react";
import "./App.css";
import Boards from "./components/Boards";
import WorkArea from "./components/Workarea";

function App() {
  return (
    <Grid columns={2} divided style={{ height: "100vh" }}>
      <Boards />
      <WorkArea />
    </Grid>
  );
}

export default App;
