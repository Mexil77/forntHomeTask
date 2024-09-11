import { Button } from "react-bootstrap";
import "./App.css";
import TaskStatusBar from "./components/TaskStatusBar";
import TasksGrid from "./components/TasksGrid";

function App() {
  return (
    <div className="TaskHome">
      <TaskStatusBar />
      <div className="TaskHome_Body">
        <TasksGrid />
        <Button className="TaskHome_Body_AddTask" variant="success">
          Agrega Tarea
        </Button>
      </div>
    </div>
  );
}

export default App;
