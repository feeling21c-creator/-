export type AppRole =
  | "owner"
  | "office_admin"
  | "site_manager"
  | "field_worker"
  | "read_only";

export type ChecklistStatus =
  | "not_started"
  | "in_progress"
  | "done"
  | "on_hold"
  | "issue"
  | "recheck_requested";

export type IssueStatus =
  | "needs_review"
  | "in_progress"
  | "on_hold"
  | "resolved";

export type Project = {
  id: string;
  projectName: string;
  address: string;
  currentProcess: string;
  progress: number;
  issueCount: number;
  uncheckedCount: number;
  manager: string;
  updatedAt: string;
  risk: "높음" | "중간" | "낮음";
};

export type ChecklistItem = {
  id: string;
  projectId: string;
  processName: string;
  itemText: string;
  status: ChecklistStatus;
  assignee: string;
  dueDate: string;
  memo?: string;
  photoCount?: number;
};

export type IssueTicket = {
  id: string;
  projectId: string;
  projectName: string;
  processName: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: "low" | "normal" | "high" | "urgent";
  assignee: string;
  dueDate: string;
  photoCount: number;
};
