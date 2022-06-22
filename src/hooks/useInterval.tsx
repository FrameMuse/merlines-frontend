import { useEffect } from "react"

function useInterval(callback: Function, ms?: number, deps?: unknown[]) {
  useEffect(() => {
    const interval = setInterval(callback, ms)
    return () => {
      clearInterval(interval)
    }
  }, [ms, ...deps || []])
}

export default useInterval