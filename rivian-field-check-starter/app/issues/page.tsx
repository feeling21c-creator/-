import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";
import { IssueCard } from "@/components/IssueCard";

export default function IssuesPage() {
  return (
    <>
      <Header title="이슈 관리" description="문제발생 항목을 자동으로 모아 담당자와 처리기한을 관리한다." />

      <section className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-blue">전체 18</span>
          <span className="badge badge-red">미해결 12</span>
          <span className="badge badge-orange">처리중 4</span>
          <span className="badge badge-green">해결 6</span>
        </div>
      </section>

      <section className="grid grid-3">
        {mockData.issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue as any} />
        ))}
      </section>
    </>
  );
}
