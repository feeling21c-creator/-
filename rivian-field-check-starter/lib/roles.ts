import type { AppRole } from "@/types";

// 역할 한글 라벨
export const ROLE_LABELS: Record<AppRole, string> = {
  owner: "대표",
  office_admin: "사무실 관리자",
  site_manager: "현장관리자",
  field_worker: "현장 작업자",
  read_only: "외부 열람자",
};

// 데모용 역할별 대표 사용자 이름 (실제 인증 전 프리뷰용)
export const DEMO_USERS: Record<AppRole, string> = {
  owner: "루카스",
  office_admin: "정수민",
  site_manager: "김현장",
  field_worker: "박작업",
  read_only: "외부열람",
};

export const ROLES_ORDER: AppRole[] = [
  "owner",
  "office_admin",
  "site_manager",
  "field_worker",
  "read_only",
];

export type NavItem = {
  href: string;
  label: string;
  icon: string; // lucide 아이콘 이름 (컴포넌트에서 매핑)
  roles: AppRole[];
};

// 전체 내비게이션 (routes.json 권한 기준)
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "홈", icon: "Home", roles: ["owner", "office_admin"] },
  { href: "/projects", label: "프로젝트", icon: "Briefcase", roles: ["owner", "office_admin", "site_manager", "read_only"] },
  { href: "/my-tasks", label: "내 작업", icon: "CheckSquare", roles: ["site_manager", "field_worker"] },
  { href: "/checklists", label: "체크리스트", icon: "ClipboardList", roles: ["owner", "office_admin", "site_manager", "field_worker"] },
  { href: "/issues", label: "이슈", icon: "AlertTriangle", roles: ["owner", "office_admin", "site_manager", "field_worker"] },
  { href: "/photos", label: "사진", icon: "Camera", roles: ["owner", "office_admin", "site_manager", "field_worker"] },
  { href: "/products", label: "가전조회", icon: "PackageSearch", roles: ["owner", "office_admin", "site_manager", "field_worker"] },
  { href: "/reports", label: "보고서", icon: "FileDown", roles: ["owner", "office_admin", "site_manager"] },
  { href: "/team", label: "팀", icon: "Users", roles: ["owner", "office_admin"] },
  { href: "/settings", label: "설정", icon: "Settings", roles: ["owner", "office_admin"] },
];

// 역할별 첫 화면
export const ROLE_HOME: Record<AppRole, string> = {
  owner: "/dashboard",
  office_admin: "/dashboard",
  site_manager: "/projects",
  field_worker: "/my-tasks",
  read_only: "/projects",
};

// 모바일 하단 탭바에 노출할 주요 항목(역할별, 최대 4개 + 더보기)
const PRIMARY: Record<AppRole, string[]> = {
  owner: ["/dashboard", "/projects", "/issues", "/photos"],
  office_admin: ["/dashboard", "/projects", "/issues", "/photos"],
  site_manager: ["/projects", "/my-tasks", "/issues", "/photos"],
  field_worker: ["/my-tasks", "/issues", "/photos", "/products"],
  read_only: ["/projects", "/issues", "/photos"],
};

export function navForRole(role: AppRole): NavItem[] {
  return NAV_ITEMS.filter((i) => i.roles.includes(role));
}

export function primaryNavForRole(role: AppRole): NavItem[] {
  const hrefs = PRIMARY[role] ?? [];
  return hrefs
    .map((h) => NAV_ITEMS.find((i) => i.href === h))
    .filter((i): i is NavItem => Boolean(i));
}

// 라우트 접근 권한 (권한별 화면 분기)
export function canAccess(role: AppRole, pathname: string): boolean {
  if (pathname === "/" || pathname.startsWith("/login")) return true;
  const matched = NAV_ITEMS.find(
    (i) => pathname === i.href || pathname.startsWith(i.href + "/")
  );
  if (!matched) return true; // 정의되지 않은 라우트는 허용
  return matched.roles.includes(role);
}
