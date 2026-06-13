import {
  AlertTriangle,
  Briefcase,
  Camera,
  CheckSquare,
  ClipboardList,
  FileDown,
  Home,
  PackageSearch,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

// roles.ts 의 icon 문자열 → 실제 lucide 컴포넌트 매핑
export const ICONS: Record<string, LucideIcon> = {
  Home,
  Briefcase,
  CheckSquare,
  ClipboardList,
  AlertTriangle,
  Camera,
  PackageSearch,
  FileDown,
  Users,
  Settings,
};
