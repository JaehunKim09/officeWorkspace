import Link from 'next/link';

export const metadata = {
  title: '개인정보처리방침',
  description: 'NOVA 홈페이지 문의 과정에서 처리하는 개인정보에 관한 안내입니다.',
};

export default function PrivacyPage() {
  return (
    <main className="policy-page">
      <header className="policy-header">
        <Link className="policy-logo" href="/" aria-label="NOVA 홈페이지로 이동">
          NO<span>V</span>A<i>.</i>
        </Link>
        <Link className="policy-back" href="/">홈으로 돌아가기</Link>
      </header>

      <article className="policy-content">
        <div className="section-label">PRIVACY POLICY</div>
        <h1>개인정보처리방침</h1>
        <p className="policy-intro">
          NOVA(이하 “회사”)는 홈페이지 문의 과정에서 필요한 최소한의 개인정보만 처리하며,
          관련 정보를 안전하게 관리하기 위해 다음과 같이 개인정보처리방침을 안내합니다.
        </p>
        <p className="policy-date">시행일: 2026년 8월 11일</p>

        <section>
          <h2>1. 개인정보의 처리 목적</h2>
          <p>회사는 다음 목적에 한해 개인정보를 처리합니다.</p>
          <ul>
            <li>홈페이지 제작, 유지관리 및 협업 문의 확인</li>
            <li>문의 내용에 대한 답변과 상담 진행</li>
            <li>문의 처리 과정에서 필요한 안내 전달</li>
          </ul>
        </section>

        <section>
          <h2>2. 처리하는 개인정보 항목과 수집 방법</h2>
          <div className="policy-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>항목</th>
                  <th>수집 방법</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>필수</td>
                  <td>회사명 또는 이름, 이메일, 문의 유형, 문의 내용</td>
                  <td>홈페이지 문의 양식</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>3. 개인정보의 처리 및 보유 기간</h2>
          <p>
            문의 정보는 문의 처리 완료일로부터 1년간 보관한 뒤 삭제합니다. 다만 관계 법령에 따라
            보존할 필요가 있거나 분쟁 처리를 위해 필요한 경우에는 해당 기간 동안 보관할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>4. 문의 정보의 전달 및 보관 방식</h2>
          <p>
            문의 양식으로 제출된 정보는 회사가 설정한 이메일 계정으로 전달되며 홈페이지의 별도
            데이터베이스에는 저장하지 않습니다. 현재 이메일 전달에는 네이버 메일 SMTP 서비스를
            사용하며, 전달된 문의는 담당자 이메일 계정에서 위 보유 기간에 따라 관리합니다.
          </p>
        </section>

        <section>
          <h2>5. 개인정보의 제3자 제공</h2>
          <p>
            회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다. 다만 정보주체가 사전에
            동의했거나 법령에 특별한 규정이 있는 경우에는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2>6. 개인정보의 파기</h2>
          <p>
            보유 기간이 지나거나 처리 목적이 달성된 개인정보는 지체 없이 삭제합니다. 이메일로
            보관된 문의는 해당 이메일 계정에서 삭제하고, 출력물이 있는 경우에는 복구하기 어려운
            방법으로 파기합니다.
          </p>
        </section>

        <section>
          <h2>7. 정보주체의 권리와 행사 방법</h2>
          <p>
            정보주체는 본인의 개인정보에 대해 열람, 정정, 삭제 또는 처리정지를 요청할 수 있습니다.
            아래 담당자 이메일로 요청하면 본인 확인 후 필요한 조치를 진행합니다.
          </p>
        </section>

        <section>
          <h2>8. 개인정보 보호 담당자</h2>
          <dl className="policy-contact">
            <div>
              <dt>담당</dt>
              <dd>NOVA 개인정보 보호 담당자</dd>
            </div>
            <div>
              <dt>이메일</dt>
              <dd><a href="mailto:kknuhet@naver.com">kknuhet@naver.com</a></dd>
            </div>
          </dl>
        </section>

        <section>
          <h2>9. 개인정보의 안전성 확보 조치</h2>
          <p>
            회사는 개인정보 접근 권한을 필요한 담당자로 제한하고, 이메일 및 서비스 계정의 인증정보를
            별도로 관리하며, 전송 과정에서 암호화된 통신을 사용합니다.
          </p>
        </section>

        <section>
          <h2>10. 개인정보처리방침의 변경</h2>
          <p>
            이 방침의 내용이 변경되는 경우 홈페이지를 통해 변경 내용과 시행일을 안내합니다.
          </p>
        </section>
      </article>

      <footer className="policy-footer">
        <span>NOVA.</span>
        <small>© 2026 NOVA. ALL RIGHTS RESERVED.</small>
      </footer>
    </main>
  );
}
