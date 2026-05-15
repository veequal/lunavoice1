// TODO: Replace mock authentication with real Apple Sign-In integration later.
// Wire to Sign in with Apple JS / native ASAuthorization and your backend JWT validation.

import { mockAppleAccounts } from '../mock/authProviders.js'

const VERIFY_MS = 1800

/**
 * Simulates Apple Sign-In + secure enclave verification.
 * @param {string} accountId
 */
export async function mockAppleSignIn(accountId) {
  const account = mockAppleAccounts.find((a) => a.id === accountId)
  if (!account) {
    return { ok: false, error: 'Account not found' }
  }

  await new Promise((r) => window.setTimeout(r, VERIFY_MS))

  return {
    ok: true,
    account,
    provider: 'apple',
    identityToken: 'mock_apple_identity_' + accountId,
  }
}
