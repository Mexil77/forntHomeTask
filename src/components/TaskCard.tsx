import { ReactElement } from "react";
import { Task } from "../types";

type TaskCardProps = {
  task: Task;
  onClick: () => void;
};

export default function TaskCard({
  task,
  onClick,
}: TaskCardProps): ReactElement {
  return (
    <div className="TaskHome_Body_Tasks_Task" onClick={onClick}>
      <div
        className={`TaskHome_Body_Tasks_Task-Status TaskHome_Body_Tasks_Task-Status${task.status}`}
      ></div>
      <h3>{task.name}</h3>
      <p>{task.daysToDone} dias</p>
    </div>
  );
}
