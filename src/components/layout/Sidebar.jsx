import Link from "next/link";
import NAV_ITEMS from "@/const/NAV_ITEMS";

const Sidebar = () => {
  return (
    <aside>
      <p>Movie App</p>
      <nav>
        {NAV_ITEMS.map((item) => (
          <div key={item.label}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <div>
                <p>{item.label}</p>
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href}>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export { Sidebar };
