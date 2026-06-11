import { Header } from "@/components/Header";

export default function SettingsPage() {
  return (
    <>
      <Header title="설정" description="1차 MVP에서는 권한·공정·체크리스트 템플릿 설정만 최소화한다." />

      <section className="grid grid-3">
        <div className="card">
          <h3>권한 설정</h3>
          <p>owner, office_admin, site_manager, field_worker, read_only</p>
        </div>
        <div className="card">
          <h3>공정 템플릿</h3>
          <p>철거, 전기, 설비, 방수, 목공, 필름, 타일, 도장, 도배 등</p>
        </div>
        <div className="card">
          <h3>체크리스트 템플릿</h3>
          <p>앱용 정규화 데이터 292개 항목을 기준으로 연동한다.</p>
        </div>
      </section>
    </>
  );
}
