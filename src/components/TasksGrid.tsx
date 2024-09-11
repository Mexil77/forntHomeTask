import { ReactElement } from "react";
import TaskCard from "./TaskCard";
import { TaskStatus } from "../enums";
import { Task } from "../types";

const mockData = [
  { name: "Lavar ropa", days: 3, status: TaskStatus.PENDING },
  { name: "Lavar trastes", days: 5, status: TaskStatus.PENDING },
  { name: "Lavar coche", days: -1, status: TaskStatus.EXPIRED },
  { name: "Lavar tenis", days: 0, status: TaskStatus.DONE },
  { name: "Lavar ventanas", days: -2, status: TaskStatus.EXPIRED },
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
