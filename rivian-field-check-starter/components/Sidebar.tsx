import Link from "next/link";
import { AlertTriangle, Camera, CheckSquare, FileDown, Home, PackageSearch, Settings, Users, Briefcase, ClipboardList } from "lucide-react";
import { Logo } from "./Logo";

const navItems = [
  { href: "/dashboard", label: "홈", icon: Home },
  { href: "/projects", label: "프로젝트", icon: Briefcase },
  { href: "/my-tasks", label: "내 작업", icon: CheckSquare },
  { href: "/checklists", label: "체크리스트", icon: ClipboardList },
  { href: "/issues", label: "이슈", icon: AlertTriangle },
  { href: "/photos", label: "사진", icon: Camera },
  { href: "/products", label: "가전조회", icon: PackageSearch },
  { href: "/reports", label: "보고서", icon: FileDown },
  { href: "/team", label: "팀", icon: Users },
  { href: "/settings", label: "설정", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <Logo compact />
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="navItem">
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
