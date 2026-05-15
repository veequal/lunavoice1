// TODO: Replace mock authentication with real Google OAuth integration later.
// Wire to Google Identity Services / OAuth 2.0 (GIS) and your backend token exchange.

import { mockGoogleAccounts } from '../mock/authProviders.js'

const VERIFY_MS = 1600

/**
 * Simulates Google OAuth account selection + token exchange.
 * @param {string} accountId
 */
export async function mockGoogleSignIn(accountId) {
  const account = mockGoogleAccounts.find((a) => a.id === accountId)
  if (!account) {
    return { ok: false, error: 'Account not found' }
  }

  await new Promise((r) => window.setTimeout(r, VERIFY_MS))

  return {
    ok: true,
    account,
    provider: 'google',
    accessToken: 'mock_google_token_' + accountId,
  }
}
