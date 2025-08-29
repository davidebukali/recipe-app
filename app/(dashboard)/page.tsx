import { SectionCards } from "@/components/section-cards";
import { redirect } from "next/navigation";

export default function Home() {
  const isAuthenticated = true; // Replace with real check (e.g., session, token)

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <SectionCards />;
}
