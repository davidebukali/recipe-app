"use client";

import { SectionCards } from "@/components/section-cards";
import { isLoggedIn } from "@/lib/authLocalstorage";
import { getTasks } from "@/lib/taskLocalstorage";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  useEffect(() => {
    const tasks = getTasks();
    setIsAuthenticated(isLoggedIn());
    setCompleted(tasks.filter((task) => task.status == "done").length);
    setPending(tasks.filter((task) => task.status == "todo").length);
  }, []);

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <SectionCards completed={completed} pending={pending} />;
}
