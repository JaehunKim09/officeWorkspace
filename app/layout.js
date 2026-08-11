import './globals.css';

export const metadata = {
  title: {
    default: 'NOVA | 홈페이지 제작과 디지털 성장 파트너',
    template: '%s | NOVA',
  },
  description: '소상공인과 중소기업을 위한 반응형 홈페이지 제작, 유지관리, 문의 전환 중심 웹사이트입니다.',
  keywords: ['홈페이지 제작', '반응형 홈페이지', '회사소개 홈페이지', '소상공인 홈페이지', '웹사이트 유지관리'],
  openGraph: {
    title: 'NOVA | 홈페이지 제작과 디지털 성장 파트너',
    description: '명확한 제작 범위, 반응형 디자인, 출시 후 유지관리까지 설계하는 홈페이지 제작 서비스입니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
