import { ReactElement } from "react";
import { Task } from "../types";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps): ReactElement {
  return (
    <div className="TaskHome_Body_Tasks_Task">
      <div
        className={`TaskHome_Body_Tasks_Task-Status TaskHome_Body_Tasks_Task-Status${task.status}`}
      ></div>
      <h3>{task.name}</h3>
      <p>{task.days} dias</p>
    </div>
  );
}
