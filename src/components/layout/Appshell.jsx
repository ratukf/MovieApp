"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

const AppShell = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export { AppShell };
