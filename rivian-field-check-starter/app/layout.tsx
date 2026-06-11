import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "RIVIAN FIELD CHECK",
  description: "팀 공유형 현장 체크 · 작업 배정 · 이슈 관리 앱",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="appShell">
          <Sidebar />
          <main className="mainArea">{children}</main>
        </div>
      </body>
    </html>
  );
}
