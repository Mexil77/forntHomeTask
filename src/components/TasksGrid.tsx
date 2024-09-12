import { ReactElement } from "react";
import TaskCard from "./TaskCard";
import { TaskStatus } from "../enums";
import { Task } from "../types";

const mockData = [
  {
    name: "Lavar ropa",
    recurrent: { active: true, days: 3 },
    date: new Date(),
    status: TaskStatus.PENDING,
  },
  {
    name: "Lavar trastes",
    recurrent: { active: true, days: 5 },
    date: new Date(),
    status: TaskStatus.PENDING,
  },
  {
    name: "Lavar coche",
    recurrent: { active: true, days: -1 },
    date: new Date(),
    status: TaskStatus.EXPIRED,
  },
  {
    name: "Lavar tenis",
    recurrent: { active: true, days: 0 },
    date: new Date(),
    status: TaskStatus.DONE,
  },
  {
    name: "Lavar ventanas",
    recurrent: { active: true, days: -2 },
    date: new Date(),
    status: TaskStatus.EXPIRED,
  },
];

export default function TasksGrid(): ReactElement {
  return (
    <div className="TaskHome_Body_Tasks">
      {mockData.map((data: Task, idx: number) => (
        <TaskCard key={idx} task={data} />
      ))}
    </div>
  );
}
