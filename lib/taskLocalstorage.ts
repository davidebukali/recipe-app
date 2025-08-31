// The key used to store the tasks in localStorage.
const STORAGE_KEY = "tasks";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  priority: "low" | "medium" | "high";
}

/**
 * A helper function to save tasks to localStorage.
 * @param tasks - The array of tasks to save.
 */
const saveTasks = (tasks: Task[]): void => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

/**
 * Retrieves all tasks from localStorage. If no tasks are found, it returns an empty array.
 * @returns An array of tasks.
 */
export const getTasks = (): Task[] => {
  if (typeof window === "undefined") {
    return []; // Return an empty array on the server-side
  }

  try {
    if (
      !localStorage.hasOwnProperty(STORAGE_KEY) &&
      localStorage.getItem(STORAGE_KEY) === null
    ) {
      return [];
    }

    const serializedTasks = localStorage.getItem(STORAGE_KEY);
    if (serializedTasks === null) {
      // If no tasks exist, return an empty array to avoid errors.
      return [];
    }
    return JSON.parse(serializedTasks) as Task[];
  } catch (error) {
    console.error("Failed to retrieve tasks from localStorage:", error);
    return [];
  }
};

/**
 * Adds a new task to the list and saves it to localStorage.
 * @param newTask - The new task to add.
 * @returns The newly created task with an assigned ID.
 */
export const createTask = (newTask: Omit<Task, "id">): Task => {
  const tasks = getTasks();
  const taskWithId: Task = {
    ...newTask,
    id: Date.now(), // Assign a unique ID based on the current timestamp
  };
  const updatedTasks = [...tasks, taskWithId];
  saveTasks(updatedTasks);
  return taskWithId;
};

/**
 * Updates an existing task by its ID.
 * @param id - The ID of the task to update.
 * @param updatedTask - The updated task data.
 * @returns The updated task, or undefined if not found.
 */
export const updateTask = (
  id: number,
  updatedTask: Partial<Task>
): Task | undefined => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    console.error(`Task with ID ${id} not found.`);
    return undefined;
  }

  const taskToUpdate = { ...tasks[taskIndex], ...updatedTask };
  const updatedTasks = [
    ...tasks.slice(0, taskIndex),
    taskToUpdate,
    ...tasks.slice(taskIndex + 1),
  ];
  saveTasks(updatedTasks);
  return taskToUpdate;
};

/**
 * Deletes a task by its ID.
 * @param id - The ID of the task to delete.
 * @returns True if the task was deleted, false otherwise.
 */
export const deleteTask = (id: number): boolean => {
  const tasks = getTasks();
  const initialLength = tasks.length;
  const updatedTasks = tasks.filter((task) => task.id !== id);

  if (updatedTasks.length < initialLength) {
    saveTasks(updatedTasks);
    return true;
  }

  console.error(`Task with ID ${id} not found.`);
  return false;
};
