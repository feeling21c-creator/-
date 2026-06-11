import { Camera } from "lucide-react";
import { Header } from "@/components/Header";

export default function PhotosPage() {
  return (
    <>
      <Header title="사진 업로드" description="사진은 프로젝트 앨범이 아니라 체크 항목과 연결되어 저장되어야 한다." />

      <section className="grid grid-2">
        <div className="card">
          <div className="uploadBox">
            <div style={{ textAlign: "center" }}>
              <Camera size={42} />
              <p>사진 촬영 / 업로드</p>
              <small>클릭 또는 드래그</small>
            </div>
          </div>
          <div className="thumbnailGrid">
            {[1, 2, 3, 4].map((num) => <div key={num} className="thumbnail">사진 {num}</div>)}
            <div className="thumbnail">+</div>
          </div>
        </div>

        <div className="card formGrid">
          <label>
            연결된 체크 항목
            <select className="select">
              <option>식기세척기 콘센트 위치를 확인하였는가?</option>
              <option>냉장고장 내부 치수를 확인하였는가?</option>
            </select>
          </label>
          <label>
            사진 설명
            <textarea className="textarea" placeholder="사진에 대한 설명을 입력하세요." />
          </label>
          <button className="primaryButton">업로드</button>
        </div>
      </section>
    </>
  );
}
