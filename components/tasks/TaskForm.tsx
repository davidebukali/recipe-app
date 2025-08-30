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

export function TaskForm() {
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);
  return (
    <AppDialog title="Add Task">
      <div className="grid gap-4">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="title" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Description</Label>
            <Textarea id="title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="type">Priority</Label>
              <Select>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Table of Contents">
                    Table of Contents
                  </SelectItem>
                  <SelectItem value="Executive Summary">
                    Executive Summary
                  </SelectItem>
                  <SelectItem value="Technical Approach">
                    Technical Approach
                  </SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Capabilities">Capabilities</SelectItem>
                  <SelectItem value="Focus Documents">
                    Focus Documents
                  </SelectItem>
                  <SelectItem value="Narrative">Narrative</SelectItem>
                  <SelectItem value="Cover Page">Cover Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <DatePicker
              label={"Due Date"}
              date={dueDate}
              setDate={setDueDate}
            />
          </div>
        </form>
      </div>
    </AppDialog>
  );
}
