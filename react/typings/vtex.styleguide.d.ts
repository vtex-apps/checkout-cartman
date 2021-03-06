import React from 'react'

declare module 'vtex.styleguide' {
  interface IconProps {
    size?: number
  }

  const IconClose: React.FC<IconProps>

  const IconCaretRight: React.FC<IconProps>

  const IconCaretLeft: React.FC<IconProps>

  const Button: React.FC<Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'style'
  > & {
    variation?: 'primary' | 'secondary' | 'tertiary'
    isLoading?: boolean
  }>

  const Alert: React.FC

  const Input: React.FC<Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'className' | 'style'
  > & {
    autoFocus?: boolean
    label?: React.ReactNode
  }>
}
