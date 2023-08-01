import { Container } from "semantic-ui-react";
import "./App.css";
import Boards from "./components/Boards";

function App() {
  return (
    <div className="centered-container">
      <Container>
        <Boards />
      </Container>
    </div>
  );
}

export default App;
