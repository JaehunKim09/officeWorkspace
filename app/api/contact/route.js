import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const DEFAULT_CONTACT_EMAIL = 'kknuhet@naver.com';
const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
const MAX_REQUEST_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INQUIRY_TYPES = {
  project: '프로젝트 문의',
  partnership: '파트너십',
  recruit: '채용 문의',
  etc: '기타',
};

function cleanText(value, maxLength) {
  return typeof value === 'string'
    ? value.trim().replace(/\0/g, '').slice(0, maxLength)
    : '';
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getMailConfig() {
  const host = process.env.SMTP_HOST?.trim() || 'smtp.naver.com';
  const user = process.env.SMTP_USER?.trim() || DEFAULT_CONTACT_EMAIL;
  const pass = process.env.SMTP_PASS?.trim();
  const port = Number(process.env.SMTP_PORT || 465);
  const secureSetting = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure = secureSetting ? secureSetting === 'true' : port === 465;
  const validSecureSetting = !secureSetting || ['true', 'false'].includes(secureSetting);
  const validPort = Number.isInteger(port) && port > 0 && port <= 65_535;

  if (!pass || !validPort || !validSecureSetting) {
    console.error('Contact email configuration is invalid', {
      missing: pass ? [] : ['SMTP_PASS'],
      invalidPort: !validPort,
      invalidSecureSetting: !validSecureSetting,
    });

    return null;
  }

  return {
    transport: {
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: { user, pass },
      tls: { minVersion: 'TLSv1.2' },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    },
    from: process.env.SMTP_FROM?.trim() || `NOVA 홈페이지 <${user}>`,
  };
}

export async function POST(request) {
  const contentLength = Number(request.headers.get('content-length') || 0);

  if (contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ message: '문의 내용이 너무 깁니다.' }, { status: 413 });
  }

  const rawBody = await request.text();

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_REQUEST_BYTES) {
    return Response.json({ message: '문의 내용이 너무 깁니다.' }, { status: 413 });
  }

  let body;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ message: '올바르지 않은 요청입니다.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ message: '올바르지 않은 요청입니다.' }, { status: 400 });
  }

  const honeypot = cleanText(body.website, 200);

  if (honeypot) {
    return Response.json({ message: '문의가 정상적으로 전송되었습니다.' });
  }

  const name = cleanText(body.name, 80).replace(/[\r\n]+/g, ' ');
  const email = cleanText(body.email, 160).toLowerCase();
  const type = cleanText(body.type, 30);
  const message = cleanText(body.message, 3_000);
  const privacy = cleanText(body.privacy, 20);

  if (!name) {
    return Response.json(
      { field: 'name', message: '회사명 또는 이름을 입력해 주세요.' },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json(
      { field: 'email', message: '답변받을 이메일 주소를 확인해 주세요.' },
      { status: 400 },
    );
  }

  if (!INQUIRY_TYPES[type]) {
    return Response.json(
      { field: 'type', message: '문의 유형을 선택해 주세요.' },
      { status: 400 },
    );
  }

  if (message.length < 5) {
    return Response.json(
      { field: 'message', message: '문의 내용은 5자 이상 입력해 주세요.' },
      { status: 400 },
    );
  }

  if (privacy !== 'agreed') {
    return Response.json(
      { field: 'privacy', message: '개인정보 수집 및 이용에 동의해 주세요.' },
      { status: 400 },
    );
  }

  const mailConfig = getMailConfig();

  if (!mailConfig) {
    return Response.json(
      { message: '메일 전송 설정이 완료되지 않았습니다. 관리자에게 문의해 주세요.' },
      { status: 503 },
    );
  }

  const submittedAt = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long',
    timeStyle: 'medium',
    timeZone: 'Asia/Seoul',
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeType = escapeHtml(INQUIRY_TYPES[type]);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');
  const transporter = nodemailer.createTransport(mailConfig.transport);

  try {
    await transporter.sendMail({
      from: mailConfig.from,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[NOVA 홈페이지 문의] ${INQUIRY_TYPES[type]} - ${name}`,
      text: [
        'NOVA 홈페이지에서 새로운 문의가 접수되었습니다.',
        '',
        `회사명 / 이름: ${name}`,
        `이메일: ${email}`,
        `문의 유형: ${INQUIRY_TYPES[type]}`,
        `접수 일시: ${submittedAt}`,
        '',
        '문의 내용',
        message,
      ].join('\n'),
      html: `
        <div style="max-width:640px;margin:0 auto;font-family:Arial,'Noto Sans KR',sans-serif;color:#111a2d;line-height:1.7">
          <div style="padding:24px 28px;background:#111a2d;color:#fff">
            <strong style="font-size:22px">NOVA.</strong>
            <p style="margin:8px 0 0;color:#aeb7c7;font-size:13px">홈페이지에서 새로운 문의가 접수되었습니다.</p>
          </div>
          <div style="padding:28px;border:1px solid #dfe3eb;border-top:0">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><th style="width:120px;padding:9px 0;text-align:left;color:#70798a">회사명 / 이름</th><td>${safeName}</td></tr>
              <tr><th style="padding:9px 0;text-align:left;color:#70798a">이메일</th><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
              <tr><th style="padding:9px 0;text-align:left;color:#70798a">문의 유형</th><td>${safeType}</td></tr>
              <tr><th style="padding:9px 0;text-align:left;color:#70798a">접수 일시</th><td>${escapeHtml(submittedAt)}</td></tr>
            </table>
            <div style="height:1px;margin:24px 0;background:#dfe3eb"></div>
            <h2 style="margin:0 0 12px;font-size:16px">문의 내용</h2>
            <p style="margin:0;font-size:14px">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    return Response.json({ message: '문의가 정상적으로 전송되었습니다.' });
  } catch (error) {
    console.error('Contact email delivery failed', {
      name: error instanceof Error ? error.name : 'UnknownError',
      code: error?.code,
      command: error?.command,
    });

    return Response.json(
      { message: '메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 502 },
    );
  }
}
