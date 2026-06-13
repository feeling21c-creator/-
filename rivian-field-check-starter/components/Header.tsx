import { Bell } from "lucide-react";

export function Header({ title, description }: { title: string; description?: string }) {
  return (
    <header className="topHeader">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <button className="iconButton" aria-label="notifications">
        <Bell size={20} />
      </button>
    </header>
  );
}
