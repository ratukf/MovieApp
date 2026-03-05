"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import NAV_ITEMS from "@/const/NAV_ITEMS";
import { useState } from "react";

const Sidebar = ({ open, onClose }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState({});

  return (
    <>
      {/* Overlay - mobile only */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-cinema-800 border-r border-cinema-600 flex flex-col z-30 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cinema-600">
          <span className="font-bold text-lg text-white tracking-tight">
            Movie<span className="text-accent-400">App</span>
          </span>
          <button
            onClick={onClose}
            className="md:hidden text-muted-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
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
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-accent-500/10 text-accent-400 border border-accent-400/20"
                      : "text-muted-400 hover:text-white hover:bg-cinema-700"
                  }`}
                >
                  <NavIcon label={item.label} active={isActive} />
                  {item.label}
                </Link>
              );
            }

            const anyChildActive = item.children?.some((c) =>
              pathname.startsWith(c.href.split("?")[0]),
            );
            const isExpanded = expanded[item.label] ?? false;

            return (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [item.label]: !prev[item.label],
                    }))
                  }
                  className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded text-sm font-medium text-muted-400 hover:text-white hover:bg-cinema-700 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <NavIcon label={item.label} active={anyChildActive} />
                    <span className={anyChildActive ? "text-accent-400" : ""}>
                      {item.label}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
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
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 pl-4 border-l border-cinema-500">
                    {item.children.map((child) => {
                      const [childPath, childQuery] = child.href.split("?");
                      const isChildActive =
                        pathname === childPath &&
                        searchParams.get("category") ===
                          new URLSearchParams(childQuery).get("category");
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`block px-3 py-2 rounded text-sm transition-all duration-200 ${
                            isChildActive
                              ? "text-accent-400 bg-accent-500/10"
                              : "text-muted-500 hover:text-white hover:bg-cinema-700"
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
        <div className="px-6 py-4 border-t border-cinema-600">
          <p className="text-xs text-muted-400">Movie App</p>
        </div>
      </aside>
    </>
  );
};

const NavIcon = ({ label, active }) => {
  const cls = `w-4 h-4 flex-shrink-0 ${active ? "text-accent-400" : "text-muted-500 group-hover:text-white"}`;

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
