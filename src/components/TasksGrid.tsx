import { ReactElement, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../types";
import axios from "axios";

type TaskGridProps = {
  setModalTask: (task: Task) => void;
  setShowModal: (active: boolean) => void;
};

export default function TasksGrid({
  setModalTask,
  setShowModal,
}: TaskGridProps): ReactElement {
  const [resData, setResData] = useState<Task[]>([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:4000/task");
    setResData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="TaskHome_Body_Tasks">
      {resData.map((data: Task, idx: number) => (
        <TaskCard
          key={idx}
          task={data}
          onClick={() => {
            setModalTask(data);
            setShowModal(true);
          }}
        />
      ))}
    </div>
  );
}
