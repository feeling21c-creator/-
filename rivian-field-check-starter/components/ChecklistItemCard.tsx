import type { ChecklistItem } from "@/types";
import { checklistStatusLabel, statusClassName } from "@/lib/status";
import { Camera, MessageSquare } from "lucide-react";

export function ChecklistItemCard({ item, compact = false }: { item: ChecklistItem; compact?: boolean }) {
  return (
    <article className="checklistCard">
      <div className="checklistTop">
        <span className="processPill">{item.processName}</span>
        <span className={statusClassName(item.status)}>{checklistStatusLabel(item.status)}</span>
      </div>
      <h3>{item.itemText}</h3>
      <div className="checklistMeta">
        <span>담당 {item.assignee}</span>
        <span>마감 {item.dueDate}</span>
        <span><Camera size={14} /> {item.photoCount ?? 0}</span>
        {item.memo && <span><MessageSquare size={14} /> 메모</span>}
      </div>
      {!compact && (
        <div className="quickActions">
          <button>완료</button>
          <button>문제있음</button>
          <button>사진찍기</button>
          <button>메모</button>
        </div>
      )}
    </article>
  );
}
