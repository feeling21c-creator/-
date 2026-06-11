import type { IssueTicket } from "@/types";
import { issueStatusLabel, statusClassName } from "@/lib/status";
import { Camera } from "lucide-react";

export function IssueCard({ issue }: { issue: IssueTicket }) {
  const priorityLabel = {
    low: "낮음",
    normal: "보통",
    high: "높음",
    urgent: "긴급",
  }[issue.priority];

  return (
    <article className="issueCard">
      <div className="checklistTop">
        <span className={`priority priority-${issue.priority}`}>{priorityLabel}</span>
        <span className={statusClassName(issue.status)}>{issueStatusLabel(issue.status)}</span>
      </div>
      <h3>{issue.title}</h3>
      <p>{issue.projectName} · {issue.processName}</p>
      <p className="issueDescription">{issue.description}</p>
      <div className="checklistMeta">
        <span>담당 {issue.assignee}</span>
        <span>기한 {issue.dueDate}</span>
        <span><Camera size={14} /> {issue.photoCount}</span>
      </div>
    </article>
  );
}
