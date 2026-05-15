/** @typedef {'empty' | 'weak' | 'medium' | 'strong'} PasswordStrength */

const SPECIAL_RE = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/

/** @param {string} password */
export function checkPasswordRules(password) {
  return {
    maxLenOk: password.length <= 30,
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: SPECIAL_RE.test(password),
  }
}

/** @param {ReturnType<typeof checkPasswordRules>} checks @param {string} password */
export function allRulesMet(checks, password) {
  return (
    password.length > 0 && checks.maxLenOk && checks.upper && checks.number && checks.special && password.length <= 30
  )
}

/** @param {string} password */
export function getPasswordStrength(password) {
  if (!password) return /** @type {const} */ ('empty')
  const checks = checkPasswordRules(password)
  if (!checks.maxLenOk || password.length > 30) return 'weak'
  if (!allRulesMet(checks, password)) return password.length < 8 ? 'weak' : 'weak'
  if (password.length >= 16) return 'strong'
  if (password.length >= 10) return 'medium'
  return 'weak'
}

/** @param {string} value */
export function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
