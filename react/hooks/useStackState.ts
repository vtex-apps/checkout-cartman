import { useState, useCallback, useMemo } from 'react'

const useStackState = <T>(initialValue?: T) => {
  const [history, setHistory] = useState<T[]>(() =>
    initialValue ? [initialValue] : []
  )

  const pushHistory = useCallback((value: T) => {
    setHistory(prev => [...prev, value])
  }, [])

  const popHistory = useCallback(() => {
    setHistory(prev => prev.slice(0, prev.length - 1))
  }, [])

  const currentData = useMemo(
    () => (history.length > 0 ? history[history.length - 1] : undefined),
    [history]
  )

  const setCurrentData = useCallback(
    (data: T) => {
      pushHistory(data)

      return () => popHistory()
    },
    [pushHistory, popHistory]
  )

  return [currentData, setCurrentData] as const
}

export default useStackState
