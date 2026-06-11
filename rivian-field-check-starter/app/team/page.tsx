import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";

export default function TeamPage() {
  return (
    <>
      <Header title="팀원 배정" description="프로젝트별 참여자, 권한, 담당 공정을 지정한다." />

      <section className="card" style={{ marginBottom: 16 }}>
        <div className="grid grid-3">
          <select className="select">
            <option>A 아파트 신축</option>
            <option>B 오피스 빌딩</option>
          </select>
          <button className="primaryButton">팀원 추가</button>
          <button className="secondaryButton">배정 변경</button>
        </div>
      </section>

      <section className="tableLike">
        {mockData.teamMembers.map((member) => (
          <div key={member.name} className="tableRow">
            <strong>{member.name}</strong>
            <span>{member.role}</span>
            <span>{member.assignedProcess}</span>
            <button className="secondaryButton">수정</button>
          </div>
        ))}
      </section>
    </>
  );
}
