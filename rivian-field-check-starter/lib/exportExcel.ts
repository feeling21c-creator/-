import * as XLSX from "xlsx";
import mockData from "@/data/mock-data.json";

export function exportChecklistWorkbook() {
  const rows = mockData.checklistItems.map((item) => ({
    프로젝트ID: item.projectId,
    공정: item.processName,
    체크항목: item.itemText,
    상태: item.status,
    담당자: item.assignee,
    마감일: item.dueDate,
    메모: item.memo,
    사진수: item.photoCount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "체크리스트");
  XLSX.writeFile(workbook, "rivian-field-check-export.xlsx");
}
