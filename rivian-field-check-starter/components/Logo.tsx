import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logoWrap">
      <Image src="/rivian-logo.png" alt="RIVIAN logo" width={compact ? 82 : 128} height={compact ? 42 : 66} priority />
      {!compact && (
        <div>
          <h1>RIVIAN FIELD CHECK</h1>
          <p>팀 공유형 현장 체크 · 작업 배정 · 이슈 관리 앱</p>
        </div>
      )}
    </div>
  );
}
