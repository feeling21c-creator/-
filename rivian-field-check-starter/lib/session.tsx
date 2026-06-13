"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { AppRole } from "@/types";
import { DEMO_USERS } from "@/lib/roles";

// ─────────────────────────────────────────────────────────────
// 데모용 세션(인증 구조 자리표시).
// 1차 프리뷰에서는 실제 Supabase Auth 대신 로컬 세션을 사용한다.
// Supabase 키가 들어오면 이 Provider 내부만 supabase.auth 로 교체하면 된다.
// ─────────────────────────────────────────────────────────────

export type Session = { role: AppRole; name: string };

const DEFAULT_SESSION: Session = { role: "owner", name: DEMO_USERS.owner };
const STORAGE_KEY = "rfc.session";

type SessionContextValue = {
  session: Session;
  ready: boolean;
  setRole: (role: AppRole) => void;
  login: (role: AppRole) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextValue>({
  session: DEFAULT_SESSION,
  ready: false,
  setRole: () => {},
  login: () => {},
  logout: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>(DEFAULT_SESSION);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  const persist = (next: Session) => {
    setSession(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const setRole = (role: AppRole) => persist({ role, name: DEMO_USERS[role] });
  const login = (role: AppRole) => persist({ role, name: DEMO_USERS[role] });
  const logout = () => persist(DEFAULT_SESSION);

  return (
    <SessionContext.Provider value={{ session, ready, setRole, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
