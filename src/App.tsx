import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import TaskStatusBar from "./components/TaskStatusBar";
import TasksGrid from "./components/TasksGrid";
import ModalTaskform from "./components/ModalTaskform";
import { TaskStatus } from "./enums";
import { Task } from "./types";

const clearTask = {
  _id: undefined,
  name: "",
  date: new Date(),
  status: TaskStatus.PENDING,
  recurrent: { active: false, days: 0 },
};

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalTask, setModalTask] = useState<Task>(clearTask);
  return (
    <div className="TaskHome">
      <TaskStatusBar />
      <div className="TaskHome_Body">
        <TasksGrid setShowModal={setOpenModal} setModalTask={setModalTask} />
        <Button
          className="TaskHome_Body_AddTask"
          variant="success"
          onClick={() => {
            setModalTask(clearTask);
            setOpenModal(!openModal);
          }}
        >
          Agrega Tarea
        </Button>
      </div>
      <ModalTaskform task={modalTask} show={openModal} setShow={setOpenModal} />
    </div>
  );
}

export default App;
