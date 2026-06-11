import { Bell, Menu } from "lucide-react";

export function Header({ title, description }: { title: string; description?: string }) {
  return (
    <header className="topHeader">
      <div>
        <button className="iconButton mobileOnly" aria-label="menu">
          <Menu size={20} />
        </button>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <button className="iconButton" aria-label="notifications">
        <Bell size={20} />
      </button>
    </header>
  );
}
