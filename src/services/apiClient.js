/**
 * Central mock transport for LunaVoice — simulates enterprise API latency and response envelopes.
 *
 * Future: Replace with `fetch` / SDK clients wired to your API gateway (auth headers, retries, etc.).
 *
 * API 1 (medical): "Computer-Implemented Method For Secure Management Of Medical Records In An AI-Enhanced System"
 * API 2 (speech): "AUTOMATIC SPEECH RECOGNITION SYSTEM FOR CHILDREN WITH SPEECH IMPAIRMENT"
 */

/** Simulated network latency bounds (ms) */
export const MOCK_LATENCY = { min: 180, max: 720 }

/** Set > 0 only for resilience demos (e.g. 0.1 = 10% failure rate). */
export const MOCK_API_FAILURE_RATE = 0

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export async function mockDelay(ms) {
  const duration = ms ?? randomBetween(MOCK_LATENCY.min, MOCK_LATENCY.max)
  await new Promise((r) => setTimeout(r, duration))
}

/**
 * @template T
 * @param {T} data
 * @param {{ delayMs?: number, shouldFail?: boolean }} [opts]
 * @returns {Promise<{ ok: true, data: T } | { ok: false, error: { code: string, message: string }, data?: null }>}
 */
export async function mockSuccess(data, opts = {}) {
  await mockDelay(opts.delayMs)
  const fail =
    opts.shouldFail === true ||
    (MOCK_API_FAILURE_RATE > 0 && Math.random() < MOCK_API_FAILURE_RATE)
  if (fail) {
    return {
      ok: false,
      error: {
        code: 'MOCK_UNAVAILABLE',
        message: 'Simulated outage — retrying usually succeeds in the mock layer.',
      },
    }
  }
  return { ok: true, data }
}

export async function mockFailure(code, message, opts = {}) {
  await mockDelay(opts.delayMs)
  return { ok: false, error: { code, message } }
}
