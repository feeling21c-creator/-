"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { canAccess, ROLE_HOME } from "@/lib/roles";

// 권한별 화면 분기: 현재 역할이 접근 불가한 라우트면 역할 홈으로 보낸다.
export function RoleGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready } = useSession();

  useEffect(() => {
    if (!ready) return;
    if (!canAccess(session.role, pathname)) {
      router.replace(ROLE_HOME[session.role]);
    }
  }, [ready, session.role, pathname, router]);

  return null;
}
