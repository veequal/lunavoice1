/**
 * Barrel export for API services — keeps imports stable when backends land.
 */

export * as medicalApi from './medicalApi.js'
export * as speechApi from './speechApi.js'
export { mockDelay, mockSuccess, MOCK_API_FAILURE_RATE, MOCK_LATENCY } from './apiClient.js'
