import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import TaskStatusBar from "./components/TaskStatusBar";
import TasksGrid from "./components/TasksGrid";
import ModalTaskform from "./components/ModalTaskform";
import { TaskStatus } from "./enums";
import { Task } from "./types";
import axios from "axios";

const clearTask = {
  name: "",
  dateToDone: new Date(),
  dateDone: new Date(),
  status: TaskStatus.PENDING,
  recurrent: { active: false, days: 0 },
};

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalTask, setModalTask] = useState<Task>(clearTask);
  const [resData, setResData] = useState<Task[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await axios.get("http://localhost:4000/task");
      setResData(res.data);
    } catch (error) {
      console.error(error);
      setResData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resData]);

  return (
    <div className="TaskHome">
      <TaskStatusBar />
      <div className="TaskHome_Body">
        <TasksGrid
          setShowModal={setOpenModal}
          setModalTask={setModalTask}
          resData={resData}
        />
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
      <ModalTaskform
        task={modalTask}
        show={openModal}
        setShow={setOpenModal}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
