"use client";

import { DataTable } from "@/components/data-table";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div className="flex flex-col">
      <div className="pull-right mb-4 flex justify-end">
        <TaskForm />
      </div>
      <div className="mb-4 text-2xl font-bold"></div>
      <div className="">
        <DataTable data={tasks} />
      </div>
    </div>
  );
}
