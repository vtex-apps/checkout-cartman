import React, { useContext, useMemo, useEffect } from 'react'

import useStackState from '../hooks/useStackState'

interface Context {
  open: boolean
  setOpen: (value: boolean) => void
  title?: string
  backAction?: () => void
  setHeaderData: (data: {
    title?: string
    backAction?: () => void
  }) => () => void
}

const CartmanContext = React.createContext<undefined | Context>(undefined)

export const useCartman = () => {
  const contextValue = useContext(CartmanContext)

  if (contextValue === undefined) {
    throw new Error('useCartman must be used inside CartmanProvider')
  }

  return contextValue
}

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
}

export const CartmanProvider: React.FC<Props> = ({
  open = false,
  setOpen,
  children,
}) => {
  const [headerData, setHeaderData] = useStackState<{
    title?: string
    backAction?: () => void
  }>({})

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      title: headerData?.title,
      backAction: headerData?.backAction,
      setHeaderData,
    }),
    [open, setOpen, headerData, setHeaderData]
  )

  return (
    <CartmanContext.Provider value={contextValue}>
      {children}
    </CartmanContext.Provider>
  )
}

export const useHeaderData = (title: string, backAction?: () => void) => {
  const { setHeaderData } = useCartman()

  useEffect(() => {
    return setHeaderData({
      title,
      backAction,
    })
  }, [setHeaderData, title, backAction])
}
