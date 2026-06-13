# RIVIAN FIELD CHECK — 테스트 배포 가이드

현재 단계는 **mock-data.json 기반 화면/플로우 검토용 테스트 배포**입니다.
Supabase·로그인·DB는 아직 연결하지 않습니다. (1차 MVP B페이즈에서 진행)

> ⚠️ 중요: 이 Next.js 앱은 저장소 루트가 아니라 **하위 폴더 `rivian-field-check-starter/`** 에 있습니다.
> 따라서 배포 시 **Root(Base) 디렉터리를 반드시 `rivian-field-check-starter` 로 지정**해야 합니다.

---

## ✅ 권장: Vercel 배포

이미 GitHub에 **Vercel App이 설치**되어 있어 가장 매끄럽습니다. Next.js 네이티브 지원이라 추가 설정도 최소입니다.

### 단계
1. https://vercel.com → **Add New → Project**
2. **Import Git Repository** → `feeling21c-creator/-` 선택
3. 설정 화면에서:
   - **Root Directory** → `Edit` → **`rivian-field-check-starter`** 선택 ← (가장 중요)
   - Framework Preset: **Next.js** (자동 감지됨)
   - Build Command / Output: 기본값 그대로 (`next build`)
   - **Environment Variables: 입력 불필요** (mock-data로 동작, supabase 키 없어도 빌드/실행됨)
4. **Deploy** 클릭
5. 발급되는 `https://<프로젝트명>.vercel.app` 접속 → `/` 가 `/dashboard` 로 리다이렉트되며 화면 확인

### 자동 배포
- `main` 브랜치에 푸시될 때마다 **Production 자동 재배포**
- PR마다 **Preview URL** 자동 생성 (화면 리뷰에 유용)

---

## 대안: Netlify 배포

저장소 루트의 `netlify.toml` 에 base 디렉터리와 Next.js 런타임이 설정되어 있어 파일 기반으로 동작합니다.

### 단계
1. https://app.netlify.com → **Add new site → Import an existing project**
2. GitHub 연결 → `feeling21c-creator/-` 선택
3. 빌드 설정은 `netlify.toml` 이 자동 적용:
   - Base directory: `rivian-field-check-starter`
   - Build command: `npm run build`
   - Plugin: `@netlify/plugin-nextjs` (자동 설치)
4. **Environment Variables: 입력 불필요**
5. **Deploy** → 발급 URL 접속

---

## 환경변수 (지금은 불필요, 참고용)

mock 단계에서는 아무 것도 넣지 않아도 됩니다. (`lib/supabase.ts` 가 키 부재 시 `null` 반환)
B페이즈에서 DB 연결 시 아래를 배포 플랫폼의 Environment Variables에 추가합니다.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_PRODUCT_LOOKUP_URL=https://serene-buttercream-d97669.netlify.app/
```

---

## 배포 후 확인할 라우트

| 경로 | 화면 |
|---|---|
| `/` → `/dashboard` | 대표/사무실 홈 (리다이렉트) |
| `/login` | 로그인 화면 |
| `/projects`, `/projects/p001` | 프로젝트 목록·상세 |
| `/my-tasks` | 현장 작업자 내 작업 |
| `/checklists` | 공정별 체크리스트 |
| `/issues` | 이슈 관리 |
| `/photos` | 사진 업로드 |
| `/products` | 가전·가구 조회(외부 링크) |
| `/reports` | 보고서·엑셀 다운로드 |
| `/team` | 팀원 배정 |
| `/settings` | 설정 |

> 현재는 정적 mock-data 기반이라 로그인·권한 분기·실제 데이터 저장은 동작하지 않습니다.
> 화면 구조와 내비게이션 흐름 검토용입니다.
