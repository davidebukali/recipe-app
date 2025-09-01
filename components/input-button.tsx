"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export function InputButton({
  title,
  handleSubmit,
}: {
  title: string;
  handleSubmit: (query: string) => void;
}) {
  const [query, setQuery] = React.useState("");
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input
        type="text"
        placeholder={title}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={() => handleSubmit(query)} variant="outline">
        {title}
      </Button>
    </div>
  );
}
