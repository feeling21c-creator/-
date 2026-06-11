import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <>
      <Header title="프로젝트 목록" description="프로젝트별 진행률, 위험도, 담당자, 최근 업데이트를 관리한다." />

      <section className="card" style={{ marginBottom: 16 }}>
        <div className="grid grid-3">
          <input className="input" placeholder="프로젝트명 또는 주소 검색" />
          <select className="select" defaultValue="">
            <option value="">상태 전체</option>
            <option>진행중</option>
            <option>보류</option>
            <option>완료</option>
          </select>
          <select className="select" defaultValue="">
            <option value="">담당자 전체</option>
            <option>김현장</option>
            <option>박재호</option>
          </select>
        </div>
      </section>

      <section className="grid">
        {mockData.projects.map((project) => (
          <ProjectCard key={project.id} project={project as any} />
        ))}
      </section>
    </>
  );
}
