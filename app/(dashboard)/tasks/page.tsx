import { DataTable } from "@/components/data-table";
import { TaskForm } from "@/components/tasks/TaskForm";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export default function Tasks() {
  const data = [
    {
      id: 61,
      title: "Monitoring and Alerting System",
      description: "Technical content",
      status: "In Process",
      duedate: "25",
      priority: "28",
    },
    {
      id: 62,
      title: "Code Review Guidelines",
      description: "Technical content",
      status: "Done",
      duedate: "12",
      priority: "15",
    },
    {
      id: 63,
      title: "Documentation Standards",
      description: "Technical content",
      status: "In Process",
      duedate: "27",
      priority: "30",
    },
    {
      id: 64,
      title: "Release Management Process",
      description: "Planning",
      status: "Done",
      duedate: "22",
      priority: "25",
    },
    {
      id: 65,
      title: "Feature Prioritization Matrix",
      description: "Planning",
      status: "In Process",
      duedate: "19",
      priority: "22",
    },
    {
      id: 66,
      title: "Technical Debt Assessment",
      description: "Technical content",
      status: "Done",
      duedate: "24",
      priority: "27",
    },
    {
      id: 67,
      title: "Capacity Planning",
      description: "Planning",
      status: "In Process",
      duedate: "21",
      priority: "24",
    },
    {
      id: 68,
      title: "Service Level Agreements",
      description: "Legal",
      status: "Done",
      duedate: "26",
      priority: "29",
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="pull-right mb-4 flex justify-end">
        <TaskForm />
      </div>
      <div className="mb-4 text-2xl font-bold"></div>
      <div className="">
        <DataTable data={data} />
      </div>
    </div>
  );
}
