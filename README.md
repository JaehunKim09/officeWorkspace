# NOVA 회사소개 홈페이지

React와 Next.js App Router로 제작한 반응형 회사소개/홈페이지 제작 서비스 샘플입니다.

## 구성

- 메인 비주얼 및 주요 이동 버튼
- 회사소개, 주요 현황, 핵심 가치
- 홈페이지 제작 서비스 패키지/가격표
- 제작 절차와 업종별 포트폴리오 로드맵
- 공지사항 목록 및 상세 팝업
- FAQ, 문의 양식 및 제출 완료 피드백
- 모바일 내비게이션과 반응형 레이아웃
- 기본 SEO metadata/Open Graph 설정

## 로컬 실행

Node.js 20.9 이상이 필요합니다.

```bash
npm install
npm run dev -- -p 3001
```

브라우저에서 [http://localhost:3001](http://localhost:3001)을 열어 확인합니다.

## 문의 메일 설정

문의 양식은 Next.js 서버 API를 통해 `kknuhet@naver.com`으로 발송됩니다. 먼저 `.env.example`을 복사해 `.env.local`을 만들고 `SMTP_PASS`에 네이버 애플리케이션 비밀번호를 입력하세요.

```bash
Copy-Item .env.example .env.local
```

네이버 로그인에서 2단계 인증과 애플리케이션 비밀번호를 설정하고, 네이버 메일의 `환경설정 > POP3/IMAP 설정 > POP3/SMTP 설정`에서 `사용함`을 선택해야 합니다. 네이버 SMTP는 SSL 포트 `465`를 사용합니다. `.env.local`은 Git에 포함되지 않습니다.

Vercel 운영 환경에도 `.env.example`의 변수들을 등록한 뒤 다시 배포해야 합니다. 특히 `SMTP_PASS`는 Sensitive 값으로 저장하세요.

## 빌드 확인

```bash
npm run build
npm run start
```

## 실제 서비스 전 체크리스트

- 문의 메일 발송 전 네이버 SMTP 연결과 실제 수신 여부를 확인하세요.
- 가격표와 제작 기간은 `homepage-business-plan.md`의 초기 가정을 바탕으로 한 예시입니다.
- 현재 화면에는 확인되지 않은 실적·주소·사업자번호·전화번호를 표시하지 않습니다. 실제 운영 정보를 확정한 뒤 검증된 값만 추가하세요.
- 개인정보 문의 메일은 처리 완료 후 1년을 기준으로 삭제하고, 운영 주체나 보관기간이 바뀌면 `/privacy` 내용도 함께 수정하세요.
- 배포 전 도메인, analytics, Search Console, favicon, Open Graph 이미지를 연결하세요.

## 추천 확장 방향

1. 현재 NOVA 페이지를 첫 포트폴리오 샘플로 사용
2. 식당/카페, 병원/클리닉, 학원, 전문직 템플릿 추가
3. 문의 폼을 실제 CRM 또는 메일 수신처와 연결
4. 견적서·계약서·자료수집 양식까지 템플릿화

## 자동 품질 및 배포 검증

GitHub Actions의 `Quality and production smoke tests` 워크플로가 다음 검사를 수행합니다.

- Pull Request와 `main` 푸시: ESLint, 문의 API 단위 테스트, Next.js 프로덕션 빌드
- Vercel 빌드: 같은 검사를 모두 통과한 배포만 생성하도록 `npm run verify` 실행
- `main` 푸시: Vercel 운영 배포의 커밋이 갱신될 때까지 기다린 뒤 홈페이지, 개인정보처리방침, 문의 API 검증
- 문의 API 운영 점검은 빈 요청의 유효성 검사만 확인하므로 실제 문의 메일을 발송하지 않음

로컬에서는 아래 명령으로 같은 품질 검사를 실행할 수 있습니다.

```bash
npm run lint
npm test
npm run build
npm run verify
```

로컬 서버를 실행한 상태에서는 운영 점검 스크립트도 확인할 수 있습니다.

```bash
npm run smoke -- http://127.0.0.1:3000
```

첫 워크플로 실행이 성공한 뒤 GitHub 브랜치 규칙에서 `Lint, test, and build`를 필수 검사로 지정하면 실패한 변경이 `main`에 병합되는 것을 막을 수 있습니다.
