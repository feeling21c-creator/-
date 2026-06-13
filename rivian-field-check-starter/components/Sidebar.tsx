"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ICONS } from "./icons";
import { RoleSwitcher } from "./RoleSwitcher";
import { useSession } from "@/lib/session";
import { navForRole, ROLE_LABELS } from "@/lib/roles";

export function Sidebar() {
  const pathname = usePathname();
  const { session } = useSession();
  const items = navForRole(session.role);

  return (
    <aside className="sidebar">
      <Logo compact />
      <nav>
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "navItem active" : "navItem"}
            >
              {Icon ? <Icon size={18} /> : null}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebarFooter">
        <div className="sidebarUser">
          <strong>{session.name}</strong>
          <span>{ROLE_LABELS[session.role]}</span>
        </div>
        <RoleSwitcher />
      </div>
    </aside>
  );
}
