"use client";

import { DataTable } from "@/components/data-table";
import { Task, TaskForm } from "@/components/tasks/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import moment from "moment";
import React from "react";

export default function Tasks() {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();

  const submitHandler = (data: Task) => {
    createTask(data);
  };

  const editHandler = (data: Task) => {
    updateTask(data.id, {
      ...data,
      dueDate: data.dueDate ? moment(data.dueDate).format() : undefined,
    });
  };

  const deleteHandler = (data: Task) => {
    const isDeleted = confirm("Are you sure you want to delete this task?");
    if (isDeleted) {
      deleteTask(data.id);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="pull-right mb-4 flex justify-end">
        <TaskForm submitHandler={submitHandler} />
      </div>
      <div className="mb-4 text-2xl font-bold"></div>
      <div className="">
        <DataTable
          data={tasks}
          handleEditTask={editHandler}
          onDelete={deleteHandler}
        />
      </div>
    </div>
  );
}
