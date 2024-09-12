import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import TaskStatusBar from "./components/TaskStatusBar";
import TasksGrid from "./components/TasksGrid";
import ModalTaskform from "./components/ModalTaskform";

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className="TaskHome">
      <TaskStatusBar />
      <div className="TaskHome_Body">
        <TasksGrid />
        <Button
          className="TaskHome_Body_AddTask"
          variant="success"
          onClick={() => setOpenModal(!openModal)}
        >
          Agrega Tarea
        </Button>
      </div>
      <ModalTaskform
        show={openModal}
        name="prueba"
        date={new Date()}
        setShow={setOpenModal}
        recurrent={{ active: false, days: 0 }}
      />
    </div>
  );
}

export default App;
