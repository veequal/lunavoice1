import { useCallback, useEffect, useState } from 'react'

/**
 * Generic async query hook for service-layer functions that return `{ ok, data?, error? }`.
 * @template T
 * @param {() => Promise<{ ok: boolean, data?: T, error?: { code?: string, message?: string } }>} fetcher
 * @param {unknown[]} deps Dependency list forwarded to `useEffect` (same rules as React hooks).
 */
export function useApiQuery(fetcher, deps = []) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(/** @type {T | null} */ (null))
  const [error, setError] = useState(/** @type {string | null} */ (null))

  const run = useCallback(() => {
    setLoading(true)
    setError(null)
    return fetcher().then((res) => {
      if (res.ok) {
        setData(res.data ?? null)
        setError(null)
      } else {
        setData(res.data ?? null)
        setError(res.error?.message ?? 'Request failed')
      }
      setLoading(false)
    })
  }, [fetcher])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetcher().then((res) => {
      if (cancelled) return
      if (res.ok) {
        setData(res.data ?? null)
        setError(null)
      } else {
        setData(res.data ?? null)
        setError(res.error?.message ?? 'Request failed')
      }
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callers pass explicit dep arrays
  }, deps)

  const refetch = useCallback(() => run(), [run])

  return { loading, data, error, refetch }
}
