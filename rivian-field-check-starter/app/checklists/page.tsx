import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";
import { ChecklistItemCard } from "@/components/ChecklistItemCard";

const processTabs = ["전체", "전기", "설비", "목공", "가구", "타일", "도배"];

export default function ChecklistsPage() {
  return (
    <>
      <Header title="공정별 체크리스트" description="공정·담당자·상태 기준으로 체크 항목을 관리한다." />

      <section className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {processTabs.map((tab, index) => (
            <span key={tab} className={index === 0 ? "badge badge-blue" : "badge"}>{tab}</span>
          ))}
        </div>
      </section>

      <section className="grid grid-2">
        {mockData.checklistItems.map((item) => (
          <ChecklistItemCard key={item.id} item={item as any} />
        ))}
      </section>
    </>
  );
}
