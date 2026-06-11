import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { ChecklistItemCard } from "@/components/ChecklistItemCard";
import { IssueCard } from "@/components/IssueCard";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = mockData.projects.find((item) => item.id === id) ?? mockData.projects[0];
  const checklist = mockData.checklistItems.filter((item) => item.projectId === project.id);
  const issues = mockData.issues.filter((item) => item.projectId === project.id);

  return (
    <>
      <Header title={project.projectName} description={`${project.address} · 담당자 ${project.manager}`} />

      <section className="card">
        <div className="grid grid-2">
          <div>
            <p>현재 공정: <strong>{project.currentProcess}</strong></p>
            <p>최근 업데이트: {project.updatedAt}</p>
            <p>위험도: <span className={`risk risk-${project.risk}`}>{project.risk}</span></p>
          </div>
          <div>
            <strong>전체 진행률 {project.progress}%</strong>
            <ProgressBar value={project.progress} />
          </div>
        </div>
      </section>

      <h3 className="sectionTitle">공정별 진행 현황</h3>
      <section className="grid grid-2">
        {["철거", "전기", "설비", "목공", "타일", "도배"].map((processName, index) => (
          <div className="card" key={processName}>
            <strong>{processName}</strong>
            <ProgressBar value={[100, 80, 60, 35, 10, 0][index]} />
          </div>
        ))}
      </section>

      <h3 className="sectionTitle">최근 체크 항목</h3>
      <section className="grid grid-2">
        {checklist.map((item) => (
          <ChecklistItemCard key={item.id} item={item as any} compact />
        ))}
      </section>

      <h3 className="sectionTitle">프로젝트 이슈</h3>
      <section className="grid grid-2">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue as any} />
        ))}
      </section>
    </>
  );
}
