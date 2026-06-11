import type { ChecklistStatus, IssueStatus } from "@/types";

export function checklistStatusLabel(status: ChecklistStatus) {
  const map: Record<ChecklistStatus, string> = {
    not_started: "아직 안 함",
    in_progress: "작업 중",
    done: "완료",
    on_hold: "보류",
    issue: "문제있음",
    recheck_requested: "재확인 요청",
  };
  return map[status];
}

export function issueStatusLabel(status: IssueStatus) {
  const map: Record<IssueStatus, string> = {
    needs_review: "확인 필요",
    in_progress: "처리중",
    on_hold: "보류",
    resolved: "완료",
  };
  return map[status];
}

export function statusClassName(status: ChecklistStatus | IssueStatus) {
  if (status === "done" || status === "resolved") return "badge badge-green";
  if (status === "issue" || status === "needs_review") return "badge badge-red";
  if (status === "in_progress") return "badge badge-blue";
  if (status === "on_hold" || status === "recheck_requested") return "badge badge-orange";
  return "badge";
}
