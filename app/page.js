'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navigation = [
  { id: 'home', label: '메인' },
  { id: 'about', label: '회사소개' },
  { id: 'service', label: '서비스' },
  { id: 'portfolio', label: '포트폴리오' },
  { id: 'guide', label: '제작안내' },
  { id: 'contact', label: '문의하기' },
];

const notices = [
  {
    id: 1,
    category: '준비',
    title: '홈페이지 제작 전에 어떤 자료가 필요한가요?',
    date: '2026.08.11',
    content: '회사 소개, 서비스 설명, 로고, 연락처, 사용할 사진을 준비하면 제작이 빠르게 진행됩니다. 자료가 부족한 경우에는 상담을 통해 필요한 내용을 먼저 정리할 수 있습니다.',
  },
  {
    id: 2,
    category: '비용',
    title: '도메인과 호스팅 비용은 제작비에 포함되나요?',
    date: '2026.08.11',
    content: '도메인, 호스팅, 외부 유료 서비스 비용은 제작비와 구분해 안내합니다. 실제 운영 주체와 예상 사용량에 맞는 서비스를 선택할 수 있도록 상담 단계에서 필요한 항목을 설명합니다.',
  },
  {
    id: 3,
    category: '진행',
    title: '제작 범위와 수정 요청은 어떻게 정하나요?',
    date: '2026.08.11',
    content: '페이지 수, 제공 기능, 수정 횟수와 일정을 작업 전에 문서로 정리합니다. 확정된 범위를 벗어나는 추가 요청은 일정과 비용을 먼저 안내한 뒤 진행합니다.',
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
    price: '20만원 ~',
    period: '7~14일',
    features: ['5페이지 내외', '모바일 반응형', '회사/서비스/위치/문의 구성', '기본 SEO 설정'],
  },
  {
    name: 'Business',
    target: '병원·학원·전문 서비스',
    price: '20만원 ~',
    period: '2~4주',
    features: ['10페이지 내외', '맞춤형 섹션', '상담·문의 흐름', '방문자 분석 도구 연동'],
    featured: true,
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
  {
    industry: 'Company',
    title: 'NOVA 회사소개 샘플',
    description: '서비스, 제작 절차, 포트폴리오와 문의 흐름을 담은 기업형 홈페이지입니다.',
    links: [{ label: '현재 샘플', href: '#home' }],
  },
  {
    industry: 'Clinic',
    title: '라온케어 병원 샘플',
    description: '핵심 진료 정보 중심의 5페이지형과 상세 안내를 더한 10페이지형을 비교할 수 있습니다.',
    links: [
      { label: 'Basic 5', href: 'https://raon-care-clinic.vercel.app' },
      { label: 'Business 10', href: 'https://raon-care-clinic.vercel.app/business' },
    ],
  },
  {
    industry: 'Academy',
    title: '리브레인 학원 샘플',
    description: '교육 핵심 정보 중심의 5페이지형과 과정·관리 내용을 확장한 10페이지형을 비교할 수 있습니다.',
    links: [
      { label: 'Basic 5', href: 'https://rebrain.vercel.app' },
      { label: 'Business 10', href: 'https://rebrain.vercel.app/business' },
    ],
  },
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
  const [formStatus, setFormStatus] = useState('idle');
  const [formMessage, setFormMessage] = useState('');

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

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    setFormStatus('sending');
    setFormMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const invalidField = result.field
          ? form.elements.namedItem(result.field)
          : null;

        if (invalidField instanceof HTMLElement) {
          invalidField.focus();
        }

        setFormStatus('error');
        setFormMessage(result.message || '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        return;
      }

      form.reset();
      setFormStatus('success');
      setFormMessage(result.message || '문의가 정상적으로 전송되었습니다.');
    } catch (error) {
      setFormStatus('error');
      setFormMessage(error instanceof Error ? error.message : '문의 전송 중 오류가 발생했습니다.');
    }
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
            <span>SERVICE</span>
            <strong>WEB</strong>
          </div>
          <div className="visual-card card-since">
            <span>FOCUS</span>
            <strong>GROWTH</strong>
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

        <div className="stats" aria-label="서비스 제공 원칙">
          <div>
            <strong>반응형</strong>
            <p>모바일·데스크톱 대응</p>
          </div>
          <div>
            <strong>명확성</strong>
            <p>범위와 비용 사전 안내</p>
          </div>
          <div>
            <strong>전환</strong>
            <p>문의 중심 동선 설계</p>
          </div>
          <div>
            <strong>관리</strong>
            <p>공개 후 유지관리</p>
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
        <div className="section-label">03&nbsp;&nbsp; PORTFOLIO SAMPLES</div>
        <div className="portfolio-heading">
          <h2>
            업종별 Basic과 Business를
            <br />
            직접 비교해 보세요.
          </h2>
          <button className="text-button" onClick={() => goTo('contact')}>샘플 제작 문의</button>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <article key={item.title}>
              <span>{item.industry}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="portfolio-links">
                {item.links.map((link) => {
                  const external = link.href.startsWith('http');

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      aria-label={external ? `${item.title} ${link.label} 새 창에서 보기` : undefined}
                    >
                      {link.label} <ArrowIcon />
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="guide" className="section notice">
        <div className="section-label">04&nbsp;&nbsp; SERVICE GUIDE</div>
        <div className="notice-heading">
          <div>
            <h2>홈페이지 제작 안내</h2>
            <p>상담 전에 많이 궁금해하는 내용을 정리했습니다.</p>
          </div>
          <span className="notice-count">GUIDES · {String(notices.length).padStart(2, '0')}</span>
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
            <a href="mailto:kknuhet@naver.com">kknuhet@naver.com</a>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={submit}
          onChange={() => {
            if (formStatus !== 'sending') {
              setFormStatus('idle');
              setFormMessage('');
            }
          }}
          aria-busy={formStatus === 'sending'}
        >
          <div className="form-honeypot" aria-hidden="true">
            <label>
              웹사이트
              <input name="website" tabIndex="-1" autoComplete="off" />
            </label>
          </div>
          <div className="form-row">
            <label>
              회사명 / 이름
              <input required name="name" maxLength="80" placeholder="회사명 또는 이름을 입력해 주세요" />
            </label>
            <label>
              이메일
              <input required type="email" name="email" maxLength="160" autoComplete="email" placeholder="답변받을 이메일을 입력해 주세요" />
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
            <textarea required name="message" rows="4" minLength="5" maxLength="3000" placeholder="문의하실 내용을 5자 이상 작성해 주세요" />
          </label>
          <div className="privacy-summary" id="privacy-summary">
            <strong>개인정보 수집·이용 안내</strong>
            <p>수집 항목: 회사명/이름, 이메일, 문의 유형, 문의 내용</p>
            <p>이용 목적: 문의 확인 및 답변</p>
            <p>보유 기간: 문의 처리 완료일로부터 1년</p>
          </div>
          <div className="form-submit-row">
            <div className="privacy-consent">
              <label className="privacy-check">
                <input type="checkbox" name="privacy" value="agreed" aria-describedby="privacy-summary" required />
                개인정보 수집 및 이용에 동의합니다.
              </label>
              <Link className="privacy-link" href="/privacy">개인정보처리방침 보기</Link>
            </div>
            <button className="submit" type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? '전송 중...' : '문의 보내기'} <ArrowIcon />
            </button>
          </div>
          {formMessage && (
            <p
              className={`form-feedback ${formStatus}`}
              role={formStatus === 'error' ? 'alert' : 'status'}
            >
              {formMessage}
            </p>
          )}
        </form>
      </section>

      <footer>
        <div className="footer-logo">NOVA.</div>
        <p>
          홈페이지 제작·유지관리
          <br />
          kknuhet@naver.com
        </p>
        <div className="footer-right">
          <Link href="/privacy">개인정보처리방침</Link>
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
