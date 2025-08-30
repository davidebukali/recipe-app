"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  label,
  setDate,
}: {
  date?: Date;
  label?: string;
  setDate: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label || "Select Date"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] overflow-hidden p-1"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
