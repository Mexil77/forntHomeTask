import { TaskStatus } from "../enums";

export interface Task {
  name: string;
  status: TaskStatus.DONE | TaskStatus.PENDING | TaskStatus.EXPIRED;
  days: number;
}
