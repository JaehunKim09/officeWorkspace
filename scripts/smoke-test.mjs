const baseUrl = new URL(
  process.env.SMOKE_BASE_URL || process.argv[2] || 'http://127.0.0.1:3000',
);
const expectedCommit = process.env.EXPECTED_COMMIT_SHA?.trim();
const retries = toPositiveInteger(process.env.SMOKE_RETRIES, expectedCommit ? 30 : 1);
const retryDelayMs = toPositiveInteger(process.env.SMOKE_RETRY_DELAY_MS, 10_000);
const requestTimeoutMs = toPositiveInteger(process.env.SMOKE_REQUEST_TIMEOUT_MS, 10_000);

function toPositiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function request(pathname, options = {}) {
  return fetch(new URL(pathname, baseUrl), {
    ...options,
    redirect: 'follow',
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
}

async function assertStatus(pathname, expectedStatus, options) {
  const response = await request(pathname, options);

  if (response.status !== expectedStatus) {
    throw new Error(`${pathname} returned ${response.status}; expected ${expectedStatus}`);
  }

  return response;
}

async function runChecks() {
  const healthResponse = await assertStatus('/api/health', 200);
  const health = await healthResponse.json();

  if (health.status !== 'ok') {
    throw new Error('/api/health did not report status=ok');
  }

  if (expectedCommit && health.commit !== expectedCommit) {
    throw new Error(`deployment commit is ${health.commit}; waiting for ${expectedCommit}`);
  }

  const homeResponse = await assertStatus('/', 200);
  const home = await homeResponse.text();

  if (!home.includes('NOVA')) {
    throw new Error('homepage does not contain the NOVA marker');
  }

  await assertStatus('/privacy', 200);

  const contactResponse = await assertStatus('/api/contact', 400, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
  });
  const contact = await contactResponse.json();

  if (contact.field !== 'name') {
    throw new Error('contact API did not return the expected validation response');
  }

  console.log(`Smoke checks passed for ${baseUrl.href} (${health.commit})`);
}

let lastError;
let passed = false;

for (let attempt = 1; attempt <= retries; attempt += 1) {
  try {
    await runChecks();
    passed = true;
    break;
  } catch (error) {
    lastError = error;

    if (attempt < retries) {
      console.log(`Smoke attempt ${attempt}/${retries} failed: ${error.message}`);
      await wait(retryDelayMs);
    }
  }
}

if (!passed) {
  console.error(`Smoke checks failed after ${retries} attempt(s): ${lastError?.message}`);
  process.exitCode = 1;
}
