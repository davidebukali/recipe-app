"use client";

import { SectionCards } from "@/components/section-cards";
import { isLoggedIn } from "@/lib/authLocalstorage";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <SectionCards />;
}
