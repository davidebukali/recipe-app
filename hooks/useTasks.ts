"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tasks";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  priority: "low" | "medium" | "high";
}

// ---------------- Helpers ----------------
const saveTasks = (tasks: Task[]): void => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];

  try {
    const serializedTasks = localStorage.getItem(STORAGE_KEY);
    return serializedTasks ? (JSON.parse(serializedTasks) as Task[]) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

// ---------------- Custom Hook ----------------
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initial load
  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  // Create
  const createTask = useCallback(
    (newTask: Omit<Task, "id">) => {
      const taskWithId: Task = { ...newTask, id: Date.now() };
      const updatedTasks = [...tasks, taskWithId];
      saveTasks(updatedTasks);
      setTasks(updatedTasks);
      return taskWithId;
    },
    [tasks]
  );

  // Update
  const updateTask = useCallback(
    (id: number, updatedTask: Partial<Task>) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return undefined;

      const taskToUpdate = { ...tasks[taskIndex], ...updatedTask };
      const updatedTasks = [
        ...tasks.slice(0, taskIndex),
        taskToUpdate,
        ...tasks.slice(taskIndex + 1),
      ];

      saveTasks(updatedTasks);
      setTasks(updatedTasks);
      return taskToUpdate;
    },
    [tasks]
  );

  // Delete
  const deleteTask = useCallback(
    (id: number) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      if (updatedTasks.length === tasks.length) return false;

      saveTasks(updatedTasks);
      setTasks(updatedTasks);
      return true;
    },
    [tasks]
  );

  // Reload (manual refresh if needed)
  const reloadTasks = useCallback(() => {
    setTasks(loadTasks());
  }, []);

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    reloadTasks,
  };
}
