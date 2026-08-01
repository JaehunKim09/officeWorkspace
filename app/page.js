'use client';

import { useEffect, useState } from 'react';

const navigation = [
  { id: 'home', label: '메인' },
  { id: 'about', label: '회사소개' },
  { id: 'service', label: '서비스' },
  { id: 'portfolio', label: '포트폴리오' },
  { id: 'notice', label: '공지사항' },
  { id: 'contact', label: '문의하기' },
];

const notices = [
  {
    id: 1,
    category: '공지',
    title: 'NOVA 공식 홈페이지를 새롭게 오픈했습니다.',
    date: '2026.08.01',
    content: 'NOVA의 새로운 소식과 비전을 더 편리하게 만나보실 수 있도록 공식 홈페이지를 새롭게 단장했습니다. 앞으로 다양한 소식으로 찾아뵙겠습니다.',
  },
  {
    id: 2,
    category: '채용',
    title: '2026년 하반기 신입·경력 공개채용 안내',
    date: '2026.07.24',
    content: '더 나은 내일을 함께 만들어 갈 새로운 동료를 기다립니다. 자세한 모집 직군과 지원 일정은 채용 담당자에게 문의해 주세요.',
  },
  {
    id: 3,
    category: '소식',
    title: 'NOVA, 디지털 혁신 파트너십 체결',
    date: '2026.07.11',
    content: 'NOVA가 산업 전반의 디지털 전환을 가속하기 위한 전략적 파트너십을 체결했습니다. 양사의 전문성을 바탕으로 새로운 고객 경험을 만들어 갈 예정입니다.',
  },
  {
    id: 4,
    category: '공지',
    title: '고객센터 운영시간 변경 안내',
    date: '2026.06.28',
    content: '더 안정적인 상담을 위해 고객센터 운영시간이 평일 오전 9시부터 오후 6시까지로 변경됩니다. 주말과 공휴일은 휴무입니다.',
  },
];

const values = [
  {
    number: '01',
    title: '도전',
    en: 'Challenge',
    icon: 'arrow',
    description: '익숙함에 머물지 않고 더 나은 가능성을 끊임없이 탐색합니다.',
  },
  {
    number: '02',
    title: '신뢰',
    en: 'Trust',
    icon: 'link',
    description: '투명한 소통과 책임 있는 실행으로 오래가는 관계를 만듭니다.',
  },
  {
    number: '03',
    title: '성장',
    en: 'Growth',
    icon: 'chart',
    description: '고객과 구성원, 사회가 함께 성장하는 방법을 고민합니다.',
  },
];

const packages = [
  {
    name: 'Basic',
    target: '소상공인·1인 사업자',
    price: '80만~150만 원',
    period: '7~14일',
    features: ['5페이지 내외', '모바일 반응형', '회사/서비스/위치/문의 구성', '기본 SEO 설정'],
  },
  {
    name: 'Business',
    target: '병원·학원·전문 서비스',
    price: '200만~400만 원',
    period: '2~4주',
    features: ['10페이지 내외', '맞춤형 섹션', '상담·예약 문의 흐름', '방문자 분석 도구 연동'],
    featured: true,
  },
  {
    name: 'Functional',
    target: '예약·결제·쇼핑몰',
    price: '별도 견적',
    period: '4~8주',
    features: ['상품/주문 관리', '외부 서비스 연동', '자동 알림', '업무 흐름 맞춤 개발'],
  },
];

const processSteps = [
  '상담 및 요구사항 확인',
  '견적·작업 범위 확정',
  '자료 수집과 콘텐츠 구성',
  '디자인 시안 제작',
  '개발 및 반응형 검수',
  '공개 후 유지관리 전환',
];

const portfolioItems = [
  { industry: 'Company', title: 'NOVA 회사소개 샘플', description: '신뢰도와 브랜드 이미지를 강조하는 기업형 랜딩페이지입니다.' },
  { industry: 'Clinic', title: '병원·클리닉 템플릿 예정', description: '진료과목, 의료진, 상담 신청 흐름을 중심으로 확장할 수 있습니다.' },
  { industry: 'Restaurant', title: '식당·카페 템플릿 예정', description: '메뉴, 위치, 예약 CTA, 네이버 플레이스 연결을 빠르게 구성합니다.' },
];

const faqs = [
  { question: '도메인과 호스팅 비용도 포함인가요?', answer: '프로젝트 견적과 별도로 안내하는 것을 기본으로 하며, 고객이 이해하기 쉽게 총비용을 분리해 설명합니다.' },
  { question: '수정은 몇 번까지 가능한가요?', answer: '기본 수정 횟수와 범위는 계약 단계에서 명확히 정하고, 추가 페이지나 기능은 별도 견적으로 처리합니다.' },
  { question: '제작 후 관리는 어떻게 하나요?', answer: '월 유지관리 상품으로 문구 수정, 이미지 교체, 점검, 콘텐츠 업데이트를 단계별로 제공합니다.' },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ValueIcon({ type }) {
  if (type === 'link') {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M16.5 23.5l7-7M13.5 28.5l-2 2a5.7 5.7 0 0 1-8-8l6-6a5.7 5.7 0 0 1 8 0M26.5 11.5l2-2a5.7 5.7 0 0 1 8 8l-6 6a5.7 5.7 0 0 1-8 0" />
      </svg>
    );
  }

  if (type === 'chart') {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M5 33V21h7v12M16.5 33V14h7v19M28 33V6h7v27M3 33h34" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M7 33L32 8M17 7h16v16" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedNotice(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeWithEscape);
    document.body.classList.toggle('modal-open', Boolean(selectedNotice));

    return () => {
      window.removeEventListener('keydown', closeWithEscape);
      document.body.classList.remove('modal-open');
    };
  }, [selectedNotice]);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const submit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <main>
      <header className="header">
        <button className="logo" onClick={() => goTo('home')} aria-label="메인으로 이동">
          NO<span>V</span>A<i>.</i>
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="주요 메뉴">
          {navigation.map((item) => (
            <button key={item.id} onClick={() => goTo(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className={menuOpen ? 'menu active' : 'menu'}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <section id="home" className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow glow-one" aria-hidden="true" />
        <div className="hero-glow glow-two" aria-hidden="true" />

        <div className="hero-content">
          <p className="eyebrow">BEYOND THE POSSIBLE</p>
          <h1>
            새로운 가능성을
            <br />
            현실로 만듭니다.
          </h1>
          <p className="hero-copy">
            기술과 사람, 아이디어를 연결해
            <br />
            비즈니스의 다음 장을 함께 엽니다.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => goTo('about')}>
              NOVA 알아보기 <ArrowIcon />
            </button>
            <button className="text-button" onClick={() => goTo('contact')}>
              프로젝트 문의
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-core">
            <span>CREATE</span>
            <strong>N</strong>
            <span>CONNECT</span>
          </div>
          <div className="visual-card card-project">
            <span>PROJECTS</span>
            <strong>180+</strong>
          </div>
          <div className="visual-card card-since">
            <span>SINCE</span>
            <strong>2014</strong>
          </div>
        </div>

        <button className="scroll-mark" onClick={() => goTo('about')}>
          <span /> SCROLL TO DISCOVER
        </button>
      </section>

      <section id="about" className="section about">
        <div className="section-label">01&nbsp;&nbsp; ABOUT US</div>
        <div className="about-head">
          <h2>
            우리는 변화의 시작을
            <br />
            함께 만드는 기업입니다.
          </h2>
          <p>
            NOVA는 유연한 기술과 창의적인 생각으로 고객의 문제를 해결합니다.
            단순한 서비스를 넘어 지속 가능한 성장을 함께 설계하는 파트너가 되겠습니다.
          </p>
        </div>

        <div className="stats" aria-label="회사 주요 현황">
          <div>
            <strong>12<span>+</span></strong>
            <p>함께한 시간</p>
          </div>
          <div>
            <strong>180<span>+</span></strong>
            <p>완료 프로젝트</p>
          </div>
          <div>
            <strong>96<span>%</span></strong>
            <p>고객 만족도</p>
          </div>
          <div>
            <strong>42<span>명</span></strong>
            <p>전문 구성원</p>
          </div>
        </div>

        <div className="values">
          {values.map((value) => (
            <article key={value.number}>
              <span className="value-number">{value.number}</span>
              <div className="value-icon"><ValueIcon type={value.icon} /></div>
              <div className="value-title">
                <h3>{value.title}</h3>
                <small>{value.en}</small>
              </div>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="service" className="section service">
        <div className="section-label">02&nbsp;&nbsp; SERVICES</div>
        <div className="service-heading">
          <h2>
            필요한 범위만 명확하게,
            <br />
            출시 후 관리까지 설계합니다.
          </h2>
          <p>제작 범위와 비용을 투명하게 나누고, 고객이 실제 문의를 받을 수 있는 구조를 우선합니다.</p>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <article className={item.featured ? 'package-card featured' : 'package-card'} key={item.name}>
              <span>{item.target}</span>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <small>예상 기간 · {item.period}</small>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="process" aria-label="홈페이지 제작 절차">
          {processSteps.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="section portfolio">
        <div className="section-label">03&nbsp;&nbsp; PORTFOLIO ROADMAP</div>
        <div className="portfolio-heading">
          <h2>
            업종별 샘플을 쌓아
            <br />
            바로 보여줄 수 있는 포트폴리오로 만듭니다.
          </h2>
          <button className="text-button" onClick={() => goTo('contact')}>샘플 제작 문의</button>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <article key={item.title}>
              <span>{item.industry}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="notice" className="section notice">
        <div className="section-label">04&nbsp;&nbsp; NEWS &amp; NOTICE</div>
        <div className="notice-heading">
          <div>
            <h2>NOVA의 새로운 소식</h2>
            <p>우리의 변화와 성장 이야기를 전합니다.</p>
          </div>
          <span className="notice-count">LATEST NEWS · {String(notices.length).padStart(2, '0')}</span>
        </div>

        <div className="notice-list">
          {notices.map((item) => (
            <button className="notice-row" key={item.id} onClick={() => setSelectedNotice(item)}>
              <span className="category">{item.category}</span>
              <strong>{item.title}</strong>
              <time dateTime={item.date.replaceAll('.', '-')}>{item.date}</time>
              <span className="row-arrow"><ArrowIcon /></span>
            </button>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-copy">
          <div className="section-label light">05&nbsp;&nbsp; CONTACT</div>
          <h2>
            좋은 아이디어는
            <br />
            대화에서 시작합니다.
          </h2>
          <p>
            새로운 프로젝트나 협업을 고민하고 계신가요?
            <br />
            NOVA가 가장 알맞은 방법을 함께 찾아드리겠습니다.
          </p>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="contact-info">
            <span>EMAIL</span>
            <a href="mailto:hello@nova.co.kr">hello@nova.co.kr</a>
            <span>PHONE</span>
            <a href="tel:+82212345678">02. 1234. 5678</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} onChange={() => setSent(false)}>
          <div className="form-row">
            <label>
              회사명 / 이름
              <input required name="name" placeholder="회사명 또는 이름을 입력해 주세요" />
            </label>
            <label>
              이메일
              <input required type="email" name="email" placeholder="답변받을 이메일을 입력해 주세요" />
            </label>
          </div>
          <label>
            문의 유형
            <select name="type" defaultValue="" required>
              <option value="" disabled>문의 유형을 선택해 주세요</option>
              <option value="project">프로젝트 문의</option>
              <option value="partnership">파트너십</option>
              <option value="recruit">채용 문의</option>
              <option value="etc">기타</option>
            </select>
          </label>
          <label>
            문의 내용
            <textarea required name="message" rows="4" placeholder="문의하실 내용을 자유롭게 작성해 주세요" />
          </label>
          <div className="form-submit-row">
            <label className="privacy-check">
              <input type="checkbox" required />
              개인정보 수집 및 이용에 동의합니다.
            </label>
            <button className="submit" type="submit">
              문의 보내기 <ArrowIcon />
            </button>
          </div>
          {sent && (
            <p className="success" role="status">
              문의 내용이 화면에서 확인되었습니다. 실제 메일 발송은 API 연결 후 활성화됩니다.
            </p>
          )}
        </form>
      </section>

      <footer>
        <div className="footer-logo">NOVA.</div>
        <p>
          서울특별시 강남구 테헤란로 123, NOVA Tower
          <br />
          사업자등록번호 123-45-67890
        </p>
        <div className="footer-right">
          <span>개인정보처리방침&nbsp;&nbsp; 이용약관</span>
          <small>© 2026 NOVA. ALL RIGHTS RESERVED.</small>
        </div>
      </footer>

      {selectedNotice && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedNotice(null)}>
          <section
            className="notice-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notice-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedNotice(null)} aria-label="공지 닫기">
              <span />
              <span />
            </button>
            <span className="modal-category">{selectedNotice.category}</span>
            <h2 id="notice-modal-title">{selectedNotice.title}</h2>
            <time>{selectedNotice.date}</time>
            <div className="modal-divider" />
            <p>{selectedNotice.content}</p>
            <button className="modal-confirm" onClick={() => setSelectedNotice(null)}>확인</button>
          </section>
        </div>
      )}
    </main>
  );
}
