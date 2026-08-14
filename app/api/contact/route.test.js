import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mailMocks = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn(),
}));

vi.mock('nodemailer', () => ({
  default: {
    createTransport: mailMocks.createTransport,
  },
}));

import { POST } from './route.js';

const VALID_SUBMISSION = {
  name: 'NOVA 테스트',
  email: 'customer@example.com',
  type: 'project',
  message: '홈페이지 제작 문의입니다.',
  privacy: 'agreed',
  website: '',
};

function createRequest(body, { raw = false, headers = {} } = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: raw ? body : JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('SMTP_HOST', 'smtp.example.test');
    vi.stubEnv('SMTP_PORT', '465');
    vi.stubEnv('SMTP_SECURE', 'true');
    vi.stubEnv('SMTP_USER', 'sender@example.test');
    vi.stubEnv('SMTP_PASS', 'test-password');
    vi.stubEnv('SMTP_FROM', 'NOVA <sender@example.test>');

    mailMocks.createTransport.mockReturnValue({
      sendMail: mailMocks.sendMail,
    });
    mailMocks.sendMail.mockResolvedValue({ messageId: 'test-message' });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('rejects malformed JSON without touching SMTP', async () => {
    const response = await POST(createRequest('{', { raw: true }));

    expect(response.status).toBe(400);
    expect(mailMocks.createTransport).not.toHaveBeenCalled();
  });

  it('validates required fields before touching SMTP', async () => {
    const response = await POST(createRequest({}));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.field).toBe('name');
    expect(mailMocks.createTransport).not.toHaveBeenCalled();
  });

  it('rejects oversized requests before parsing the body', async () => {
    const response = await POST(
      createRequest({}, { headers: { 'content-length': '20001' } }),
    );

    expect(response.status).toBe(413);
    expect(mailMocks.createTransport).not.toHaveBeenCalled();
  });

  it('accepts the honeypot path without sending mail', async () => {
    const response = await POST(
      createRequest({ ...VALID_SUBMISSION, website: 'https://spam.example' }),
    );

    expect(response.status).toBe(200);
    expect(mailMocks.createTransport).not.toHaveBeenCalled();
  });

  it('returns 503 when the SMTP password is missing', async () => {
    vi.stubEnv('SMTP_PASS', '');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await POST(createRequest(VALID_SUBMISSION));

    expect(response.status).toBe(503);
    expect(mailMocks.createTransport).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledOnce();
  });

  it('sends a validated and HTML-escaped inquiry', async () => {
    const response = await POST(
      createRequest({
        ...VALID_SUBMISSION,
        name: '<b>NOVA</b>',
        message: '문의 내용 <script>alert(1)</script>',
      }),
    );
    const mail = mailMocks.sendMail.mock.calls[0][0];

    expect(response.status).toBe(200);
    expect(mailMocks.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'smtp.example.test',
        port: 465,
        secure: true,
        auth: {
          user: 'sender@example.test',
          pass: 'test-password',
        },
      }),
    );
    expect(mail).toEqual(
      expect.objectContaining({
        replyTo: 'customer@example.com',
      }),
    );
    expect(mail.html).toContain('&lt;b&gt;NOVA&lt;/b&gt;');
    expect(mail.html).not.toContain('<script>');
  });

  it('returns 502 when SMTP delivery fails', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    mailMocks.sendMail.mockRejectedValue(
      Object.assign(new Error('SMTP unavailable'), { code: 'ECONNECTION' }),
    );

    const response = await POST(createRequest(VALID_SUBMISSION));

    expect(response.status).toBe(502);
    expect(consoleError).toHaveBeenCalledOnce();
  });
});
