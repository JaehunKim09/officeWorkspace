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
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 문의 메일 설정

문의 양식은 Next.js 서버 API를 통해 `kknuhet@naver.com`으로 발송됩니다. 먼저 `.env.example`을 복사해 `.env.local`을 만들고 `SMTP_PASS`에 네이버 애플리케이션 비밀번호를 입력하세요.

```bash
Copy-Item .env.example .env.local
```

네이버 로그인에서 2단계 인증과 애플리케이션 비밀번호를 설정하고, 네이버 메일의 `환경설정 > POP3/IMAP 설정 > IMAP/SMTP 설정`에서 SMTP 사용을 활성화해야 합니다. `.env.local`은 Git에 포함되지 않습니다.

## 빌드 확인

```bash
npm run build
npm run start
```

## 실제 서비스 전 체크리스트

- 문의 메일 발송 전 네이버 SMTP 연결과 실제 수신 여부를 확인하세요.
- 가격표와 제작 기간은 `homepage-business-plan.md`의 초기 가정을 바탕으로 한 예시입니다.
- 고객사 실정보다 샘플 데이터를 먼저 사용하고, 공개 전 상호명/주소/사업자번호/연락처를 반드시 교체하세요.
- 배포 전 도메인, analytics, Search Console, favicon, Open Graph 이미지를 연결하세요.

## 추천 확장 방향

1. 현재 NOVA 페이지를 첫 포트폴리오 샘플로 사용
2. 식당/카페, 병원/클리닉, 학원, 전문직 템플릿 추가
3. 문의 폼을 실제 CRM 또는 메일 수신처와 연결
4. 견적서·계약서·자료수집 양식까지 템플릿화
