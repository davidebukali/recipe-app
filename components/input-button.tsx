"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Recipe } from "./card";
import { Loader2Icon } from "lucide-react";
import { IconSearch } from "@tabler/icons-react";

export function InputButton({
  title,
  handleSubmit,
  loading,
}: {
  title: string;
  handleSubmit: (query: string) => void;
  loading: boolean;
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
        {loading && <Loader2Icon className="animate-spin" />}
        <IconSearch /> {title}
      </Button>
    </div>
  );
}
