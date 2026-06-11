import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="loginPage">
      <section className="loginCard">
        <div className="loginLogo">
          <Image src="/rivian-logo.png" alt="RIVIAN logo" width={160} height={82} />
          <strong>RIVIAN FIELD CHECK</strong>
          <span>현장 체크 · 작업 배정 · 이슈 관리</span>
        </div>
        <div className="formGrid">
          <input className="input" placeholder="이메일 또는 휴대폰 번호" />
          <input className="input" placeholder="비밀번호" type="password" />
          <label style={{ display: "flex", gap: 8, alignItems: "center", color: "#687386" }}>
            <input type="checkbox" />
            로그인 상태 유지
          </label>
          <a className="primaryButton" href="/dashboard" style={{ textAlign: "center" }}>로그인</a>
        </div>
      </section>
    </div>
  );
}
