import React from 'react'

declare module 'vtex.styleguide' {
  const IconClose: React.FC<{ size?: number }>

  const Button: React.FC<Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'style'
  > & {
    variation?: 'primary' | 'secondary' | 'tertiary'
  }>
}
