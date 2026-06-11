import Link from "next/link";
import type { Project } from "@/types";
import { ProgressBar } from "./ProgressBar";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="projectCard">
      <div className="projectInitial">{project.projectName.slice(0, 1)}</div>
      <div className="projectMain">
        <div className="projectTitleRow">
          <strong>{project.projectName}</strong>
          <span className={`risk risk-${project.risk}`}>{project.risk}</span>
        </div>
        <p>{project.address}</p>
        <div className="projectMeta">
          <span>현재공정 {project.currentProcess}</span>
          <span>담당 {project.manager}</span>
          <span>{project.updatedAt}</span>
        </div>
        <ProgressBar value={project.progress} />
      </div>
      <strong className="projectPercent">{project.progress}%</strong>
    </Link>
  );
}
