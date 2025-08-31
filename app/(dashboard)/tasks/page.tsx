"use client";

import { DataTable } from "@/components/data-table";
import { Task, TaskForm } from "@/components/tasks/TaskForm";
import { createTask, getTasks, updateTask } from "@/lib/taskLocalstorage";
import moment from "moment";
import React, { useEffect } from "react";

export default function Tasks() {
  const [taskId, setTaskId] = React.useState<number>(0);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, [taskId]);

  const submitHandler = (data: Task) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);
    const task = createTask(data);
    setTaskId(task.id);
  };

  const editHandler = (data: Task) => {
    // Handle form submission logic here
    console.log("Edit Form submitted:", data);
    updateTask(data.id, {
      ...data,
      dueDate: data.dueDate ? moment(data.dueDate).format() : undefined,
    });
    setTaskId(Date.now());
  };

  return (
    <div className="flex flex-col">
      <div className="pull-right mb-4 flex justify-end">
        <TaskForm submitHandler={submitHandler} />
      </div>
      <div className="mb-4 text-2xl font-bold"></div>
      <div className="">
        <DataTable data={tasks} handleEditTask={editHandler} />
      </div>
    </div>
  );
}
