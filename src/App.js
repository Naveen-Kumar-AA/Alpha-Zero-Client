import "./App.css";
import Board from "./components/Board";

function App() {

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
  <Board />
</div>

  );
}

export default App;
