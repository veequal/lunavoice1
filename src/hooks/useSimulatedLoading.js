import { useEffect, useState } from 'react'

export function useSimulatedLoading(ms = 450) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), ms)
    return () => window.clearTimeout(t)
  }, [ms])

  return ready
}
