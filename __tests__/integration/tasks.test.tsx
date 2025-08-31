import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Task, TaskForm } from "@/components/tasks/TaskForm";
import { DataTable } from "@/components/data-table";

const mockTaskFormSubmit = vi.fn();

describe("Tasks", () => {
  test("can add a task", async () => {
    render(<TaskForm submitHandler={mockTaskFormSubmit} />);

    fireEvent.click(screen.getByText(/Add Task/i));

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "This is a test task description." },
    });
    fireEvent.mouseDown(screen.getByLabelText(/priority/i, { exact: false })); // Open the priority dropdown
    fireEvent.click(screen.getByText(/Medium/i)); // Select "Medium" priority
    fireEvent.mouseDown(screen.getByLabelText(/status/i, { exact: false })); // Open the status dropdown
    fireEvent.click(screen.getByText(/In Progress/i)); // Select "In Progress" status
    fireEvent.change(screen.getByLabelText(/due date/i, { exact: false }), {
      target: { value: "2025-09-01" },
    });

    expect(screen.getByLabelText(/title/i)).toHaveValue("Test Task");

    fireEvent.click(screen.getByText(/Save changes/i));
    expect(screen.getByLabelText(/title/i)).toBeEmptyDOMElement();
  });

  // test it lists tasks
  test("lists tasks", async () => {
    const tasks: Task[] = [
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
    render(<DataTable data={tasks} />);
    expect(
      screen.getByText("Monitoring and Alerting System")
    ).toBeInTheDocument();
    expect(screen.getByText("Code Review Guidelines")).toBeInTheDocument();
    expect(screen.getByText("Documentation Standards")).toBeInTheDocument();
  });
});
