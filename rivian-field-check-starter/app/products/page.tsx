import mockData from "@/data/mock-data.json";
import { Header } from "@/components/Header";
import { ExternalLink } from "lucide-react";

export default function ProductsPage() {
  return (
    <>
      <Header title="가전·가구 조회" description="1차 MVP에서는 기존 Netlify 조회 앱을 외부 링크로 연결한다." />

      <section className="card">
        <h3>가전·가구 치수 조회</h3>
        <p style={{ color: "#687386" }}>
          현재 단계에서는 프로젝트 데이터와 직접 연결하지 않는다. 2차 개발에서 제품 선택, 현장 실측, 설치 가능 여부 판정을 내부 통합한다.
        </p>
        <a className="primaryButton" href={mockData.productLookupUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          조회 앱 열기 <ExternalLink size={16} />
        </a>
      </section>
    </>
  );
}
