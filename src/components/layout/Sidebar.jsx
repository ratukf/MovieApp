"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NAV_ITEMS from "@/const/NAV_ITEMS";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-cinema-800 border-r border-white/5 flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-black"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-white tracking-tight">
          Cine<span className="text-yellow-400">Vault</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          if (item.href) {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <NavIcon label={item.label} active={isActive} />
                {item.label}
              </Link>
            );
          }

          // Has children (submenu)
          const anyChildActive = item.children?.some((c) =>
            pathname.startsWith(c.href.split("?")[0]),
          );
          return (
            <div key={item.label}>
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <NavIcon label={item.label} active={anyChildActive} />
                  <span className={anyChildActive ? "text-yellow-400" : ""}>
                    {item.label}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expanded && (
                <div className="ml-4 mt-1 space-y-1 pl-4 border-l border-white/10">
                  {item.children.map((child) => {
                    const isChildActive =
                      pathname +
                        (typeof window !== "undefined"
                          ? window.location.search
                          : "") ===
                      child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isChildActive
                            ? "text-yellow-400 bg-yellow-400/10"
                            : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5">
        <p className="text-xs text-slate-600">CineVault v1.0</p>
      </div>
    </aside>
  );
};

const NavIcon = ({ label, active }) => {
  const cls = `w-4 h-4 flex-shrink-0 ${active ? "text-yellow-400" : "text-slate-500 group-hover:text-slate-300"}`;

  if (label === "Home")
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    );
  if (label === "Movies")
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
      </svg>
    );
  if (label === "Bookmarks")
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
    );
  return null;
};

export { Sidebar };
