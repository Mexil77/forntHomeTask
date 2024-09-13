import { ReactElement } from "react";
import TaskCard from "./TaskCard";
import { TaskStatus } from "../enums";
import { Task } from "../types";

const mockData = [
  {
    _id: 1,
    name: "Lavar ropa",
    recurrent: { active: true, days: 3 },
    dateToDone: new Date(),
    dateDone: new Date(),
    daysToDone: 3,
    status: TaskStatus.PENDING,
  },
  {
    _id: 2,
    name: "Lavar trastes",
    recurrent: { active: false, days: 0 },
    dateToDone: new Date(),
    dateDone: new Date(),
    daysToDone: 5,
    status: TaskStatus.PENDING,
  },
  {
    _id: 3,
    name: "Lavar coche",
    recurrent: { active: false, days: 0 },
    dateToDone: new Date(),
    dateDone: new Date(),
    daysToDone: -1,
    status: TaskStatus.EXPIRED,
  },
  {
    _id: 4,
    name: "Lavar tenis",
    recurrent: { active: true, days: 7 },
    dateToDone: new Date(),
    dateDone: new Date(),
    daysToDone: 0,
    status: TaskStatus.DONE,
  },
  {
    _id: 5,
    name: "Lavar ventanas",
    recurrent: { active: true, days: 3 },
    dateToDone: new Date(),
    dateDone: new Date(),
    daysToDone: -2,
    status: TaskStatus.EXPIRED,
  },
];

type TaskGridProps = {
  setModalTask: (task: Task) => void;
  setShowModal: (active: boolean) => void;
};

export default function TasksGrid({
  setModalTask,
  setShowModal,
}: TaskGridProps): ReactElement {
  return (
    <div className="TaskHome_Body_Tasks">
      {mockData.map((data: Task, idx: number) => (
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
