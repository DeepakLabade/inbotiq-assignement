"use client";

import Header from "@/components/dashboard-header";
import { usePathname } from "next/navigation";

interface UserData {
  name: string;
  role: "User" | "Admin";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
