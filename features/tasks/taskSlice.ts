import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type priority = "low" | "medium" | "high";
export type status = "todo" | "in-progress" | "done";
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: priority;
  status: status;
  dueDate: string; // ISO date string
}

const initialState: Task[] = [
  {
    id: 61,
    title: "Monitoring and Alerting System",
    description: "Technical content",
    status: "in-progress",
    dueDate: "25",
    priority: "medium",
  },
  {
    id: 62,
    title: "Code Review Guidelines",
    description: "Technical content",
    status: "todo",
    dueDate: "12",
    priority: "high",
  },
  {
    id: 63,
    title: "Documentation Standards",
    description: "Technical content",
    status: "todo",
    dueDate: "27",
    priority: "low",
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    edit: (state) => {},
    remove: (state, action: PayloadAction<number>) => {},
  },
});

// Action creators are generated for each case reducer function
export const { add, edit, remove } = taskSlice.actions;

export default taskSlice.reducer;
