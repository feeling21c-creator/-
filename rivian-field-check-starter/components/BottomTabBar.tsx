"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ICONS } from "./icons";
import { RoleSwitcher } from "./RoleSwitcher";
import { useSession } from "@/lib/session";
import { navForRole, primaryNavForRole, ROLE_LABELS } from "@/lib/roles";

// 모바일 전용 하단 탭바 + 전체 메뉴 시트(더보기)
export function BottomTabBar() {
  const pathname = usePathname();
  const { session } = useSession();
  const [open, setOpen] = useState(false);

  const primary = primaryNavForRole(session.role);
  const all = navForRole(session.role);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {open && (
        <div className="moreSheet" role="dialog" aria-label="전체 메뉴">
          <div className="moreSheet-backdrop" onClick={() => setOpen(false)} />
          <div className="moreSheet-panel">
            <div className="moreSheet-header">
              <div className="sidebarUser">
                <strong>{session.name}</strong>
                <span>{ROLE_LABELS[session.role]}</span>
              </div>
              <button className="iconButton" aria-label="닫기" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="moreSheet-grid">
              {all.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive(item.href) ? "moreItem active" : "moreItem"}
                    onClick={() => setOpen(false)}
                  >
                    {Icon ? <Icon size={20} /> : null}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="moreSheet-footer">
              <RoleSwitcher />
            </div>
          </div>
        </div>
      )}

      <nav className="bottomTab" aria-label="하단 내비게이션">
        {primary.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "bottomTab-item active" : "bottomTab-item"}
            >
              {Icon ? <Icon size={20} /> : null}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          className={open ? "bottomTab-item active" : "bottomTab-item"}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu size={20} />
          <span>더보기</span>
        </button>
      </nav>
    </>
  );
}
