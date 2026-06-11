# RIVIAN FIELD CHECK Starter

팀 공유형 현장 체크 · 작업 배정 · 이슈 관리 앱의 Next.js 프론트엔드 스타터 패키지입니다.

## 목적

이 패키지는 완성 앱이 아니라, 다음 개발 단계를 위한 화면 골격입니다.

- 권한별 화면 구조 확인
- 프로젝트 / 체크리스트 / 이슈 / 사진 / 팀 배정 흐름 확인
- Supabase 연결 전 정적 데이터 기반 UI 검토
- 1차 MVP 범위 고정

## 포함 화면

- `/login` 로그인
- `/dashboard` 대표 / 사무실 홈
- `/projects` 프로젝트 목록
- `/projects/[id]` 프로젝트 상세
- `/my-tasks` 현장 작업자 내 작업
- `/checklists` 공정별 체크리스트
- `/issues` 이슈 관리
- `/photos` 사진 업로드
- `/products` 가전·가구 조회 외부 링크
- `/reports` 보고서 / 엑셀 다운로드
- `/team` 팀원 배정
- `/settings` 설정

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 다음 주소를 엽니다.

```bash
http://localhost:3000
```

## Supabase 연결

`.env.example` 파일을 `.env.local`로 복사한 뒤 Supabase 값을 입력합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_PRODUCT_LOOKUP_URL=https://serene-buttercream-d97669.netlify.app/
```

## 다음 개발 작업

1. Supabase SQL 스키마 실행
2. process_templates CSV 업로드
3. checklist_templates CSV 업로드
4. 로그인 구현
5. 프로젝트 생성 기능 구현
6. 프로젝트별 체크리스트 자동 생성
7. 사진 업로드 Supabase Storage 연결
8. 이슈 자동 생성 로직 연결
9. activity_logs 자동 기록 연결
10. 엑셀 다운로드 실제 DB 데이터로 전환

## 1차 MVP 제외 항목

- 마감재 조회
- 고객 공유 화면
- 카카오톡 알림
- 문자 알림
- AI 자동 요약
- 고급 PDF 보고서

이 항목들은 앱 안정화 후 2차 또는 3차 기능으로 분리합니다.
