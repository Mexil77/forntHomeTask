import { TaskStatus } from "../enums";

export interface Recurrent {
  active: boolean;
  days: number;
}

export interface Task {
  _id: number | undefined;
  name: string;
  status: TaskStatus.DONE | TaskStatus.PENDING | TaskStatus.EXPIRED;
  date: Date;
  recurrent: Recurrent;
}
