import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";
import { ChecklistItemCard } from "@/components/ChecklistItemCard";

export default function MyTasksPage() {
  const tasks = mockData.checklistItems;

  return (
    <>
      <Header title="내 작업" description="현장 작업자는 이 화면에서 오늘 할 일만 확인하고 빠르게 기록한다." />

      <section className="card" style={{ marginBottom: 16 }}>
        <strong>오늘의 배정 작업</strong>
        <p style={{ color: "#687386" }}>A 아파트 신축 · 2025.05.20 (화)</p>
      </section>

      <section className="grid grid-2">
        {tasks.map((item) => (
          <ChecklistItemCard key={item.id} item={item as any} />
        ))}
      </section>
    </>
  );
}
