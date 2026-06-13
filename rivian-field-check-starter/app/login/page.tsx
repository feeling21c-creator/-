"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { ROLES_ORDER, ROLE_LABELS, ROLE_HOME, DEMO_USERS } from "@/lib/roles";
import type { AppRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSession();

  const enter = (role: AppRole) => {
    login(role);
    router.push(ROLE_HOME[role]);
  };

  return (
    <div className="loginPage">
      <section className="loginCard">
        <div className="loginLogo">
          <Image src="/rivian-logo.png" alt="RIVIAN logo" width={160} height={82} />
          <strong>RIVIAN FIELD CHECK</strong>
          <span>현장 체크 · 작업 배정 · 이슈 관리</span>
        </div>

        <div className="formGrid">
          <input className="input" placeholder="이메일 또는 휴대폰 번호" />
          <input className="input" placeholder="비밀번호" type="password" />
          <label style={{ display: "flex", gap: 8, alignItems: "center", color: "#687386" }}>
            <input type="checkbox" />
            로그인 상태 유지
          </label>
          <button className="primaryButton" type="button" onClick={() => enter("owner")}>
            로그인
          </button>
        </div>

        <div className="loginDemo">
          <p className="loginDemo-title">데모 로그인 — 역할별 화면 미리보기</p>
          <div className="loginDemo-grid">
            {ROLES_ORDER.map((role) => (
              <button
                key={role}
                type="button"
                className="secondaryButton loginDemo-btn"
                onClick={() => enter(role)}
              >
                <strong>{ROLE_LABELS[role]}</strong>
                <span>{DEMO_USERS[role]}</span>
              </button>
            ))}
          </div>
          <p className="loginDemo-note">
            * 1차 프리뷰는 mock 데이터 기반입니다. 실제 인증은 Supabase 연결 단계에서 적용됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}
