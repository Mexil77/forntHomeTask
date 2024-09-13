import { ReactElement } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../types";

type TaskGridProps = {
  setModalTask: (task: Task) => void;
  setShowModal: (active: boolean) => void;
  resData: Task[];
};

export default function TasksGrid({
  setModalTask,
  setShowModal,
  resData,
}: TaskGridProps): ReactElement {
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
