import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { ProjectCard } from "@/components/ProjectCard";
import { IssueCard } from "@/components/IssueCard";

export default function DashboardPage() {
  const projects = mockData.projects;
  const issues = mockData.issues;
  const openIssues = issues.filter((issue) => issue.status !== "resolved").length;
  const totalUnchecked = projects.reduce((sum, p) => sum + p.uncheckedCount, 0);

  return (
    <>
      <Header title="대표 / 사무실 홈" description="위험 현장과 미처리 항목을 30초 안에 확인하는 화면이다." />

      <section className="grid grid-4">
        <StatCard label="진행 중 프로젝트" value={projects.length} tone="blue" />
        <StatCard label="문제발생 항목" value={openIssues} tone="red" />
        <StatCard label="미완료 체크" value={totalUnchecked} tone="orange" />
        <StatCard label="오늘 업데이트" value={34} tone="blue" />
      </section>

      <h3 className="sectionTitle">프로젝트 위험도 개요</h3>
      <section className="grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project as any} />
        ))}
      </section>

      <h3 className="sectionTitle">최근 이슈</h3>
      <section className="grid grid-3">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue as any} />
        ))}
      </section>
    </>
  );
}
