"use client";

import { Header } from "@/components/Header";
import { exportChecklistWorkbook } from "@/lib/exportExcel";
import { FileDown, ImageIcon, AlertTriangle, ClipboardList } from "lucide-react";

export default function ReportsPage() {
  return (
    <>
      <Header title="보고서 / 엑셀 다운로드" description="1차 MVP에서는 PDF보다 엑셀 다운로드를 우선 구현한다." />

      <section className="grid grid-2">
        <div className="card formGrid">
          <select className="select">
            <option>전체 프로젝트</option>
            <option>A 아파트 신축</option>
            <option>B 오피스 빌딩</option>
          </select>
          <select className="select">
            <option>공정 전체</option>
            <option>전기</option>
            <option>설비</option>
            <option>목공</option>
          </select>
          <select className="select">
            <option>상태 전체</option>
            <option>문제있음</option>
            <option>완료</option>
          </select>
        </div>

        <div className="grid grid-2">
          <div className="card"><ClipboardList /> <p>체크리스트 보고서</p></div>
          <div className="card"><AlertTriangle /> <p>이슈 보고서</p></div>
          <div className="card"><ImageIcon /> <p>사진 보고서</p></div>
          <div className="card"><FileDown /> <p>종합 보고서</p></div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <button className="primaryButton" onClick={exportChecklistWorkbook}>
          엑셀 다운로드 (.xlsx)
        </button>
      </section>
    </>
  );
}
