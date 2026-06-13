"use client";

import { useSession } from "@/lib/session";
import { ROLES_ORDER, ROLE_LABELS, ROLE_HOME } from "@/lib/roles";
import type { AppRole } from "@/types";
import { useRouter } from "next/navigation";

// 데모용 역할 전환기 — 실제 인증 적용 전, 권한별 화면을 바로 확인하기 위한 도구
export function RoleSwitcher({ compact = false }: { compact?: boolean }) {
  const { session, setRole } = useSession();
  const router = useRouter();

  const onChange = (role: AppRole) => {
    setRole(role);
    router.push(ROLE_HOME[role]);
  };

  return (
    <div className={compact ? "roleSwitcher roleSwitcher-compact" : "roleSwitcher"}>
      <span className="roleSwitcher-label">데모 역할</span>
      <select
        className="roleSwitcher-select"
        value={session.role}
        onChange={(e) => onChange(e.target.value as AppRole)}
        aria-label="역할 전환"
      >
        {ROLES_ORDER.map((role) => (
          <option key={role} value={role}>
            {ROLE_LABELS[role]}
          </option>
        ))}
      </select>
    </div>
  );
}
