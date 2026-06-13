"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { BottomTabBar } from "./BottomTabBar";
import { RoleGuard } from "./RoleGuard";

// 로그인 화면은 풀스크린(사이드바 없음), 그 외에는 앱 셸로 감싼다.
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthScreen = pathname === "/login";

  if (isAuthScreen) {
    return <>{children}</>;
  }

  return (
    <div className="appShell">
      <RoleGuard />
      <Sidebar />
      <main className="mainArea">{children}</main>
      <BottomTabBar />
    </div>
  );
}
