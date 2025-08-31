"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date-picker";
import React from "react";
import { AppDialog } from "../app-dialog";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

// 1. Define a Zod schema for validation
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in-progress", "done"]),
  dueDate: z
    .date()
    .nullable()
    .refine((date) => date !== null, "Due date is required"),
});

type TaskFormState = z.infer<typeof taskSchema>;

export function TaskForm({
  submitHandler,
}: {
  submitHandler: (data: Task) => void;
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormState>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      status: "todo",
      dueDate: null,
    },
  });

  const onSubmit = (data: TaskFormState) => {
    // Dispatch the validated data to the Redux store
    console.log("Form Data:", {
      id: Date.now(),
      title: data.title,
      description: data.description,
      priority: data.priority as priority,
      status: data.status as status,
      dueDate: data.dueDate
        ? data.dueDate.toISOString()
        : Date.now().toString(),
    });

    submitHandler({
      id: Date.now(),
      title: data.title,
      description: data.description,
      priority: data.priority as priority,
      status: data.status as status,
      dueDate: data.dueDate
        ? data.dueDate.toISOString()
        : Date.now().toString(),
    });

    // Reset the form
    reset();
    toast.success("Your new task has been added");
  };

  return (
    <AppDialog title="Add Task" formId="task-form">
      <div className="grid gap-4">
        <form
          id="task-form"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input id="title" {...field} />}
            />
            {errors.title && (
              <p className="text-red-500 text-sm px-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea id="description" {...field} />}
            />
            {errors.description && (
              <p className="text-red-500 text-sm px-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger id="priority" className="w-full">
                      <SelectValue placeholder="Select a Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="todo">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Due Date"
                  date={field.value || undefined}
                  setDate={field.onChange}
                />
              )}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm px-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </AppDialog>
  );
}
