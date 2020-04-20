import classnames from 'classnames'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { IconClose } from 'vtex.styleguide'

import CartmanSidebar from './CartmanSidebar'
import CartmanIcon from './CartmanIcon'
import styles from './CartmanBubble.css'
import { CartmanProvider } from './CartmanContext'

const CartmanBubble: React.FC = () => {
  const [containerElement] = useState(() => {
    return document.createElement('div')
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.appendChild(containerElement)
  }, [containerElement])

  const handleBubbleClick = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return ReactDOM.createPortal(
    <CartmanProvider open={open} setOpen={setOpen}>
      <div className="fixed right-0 bottom-0 left-0 top-0 pa0 pa5-s pa6-m flex flex-column justify-end items-end z-max">
        {open && <CartmanSidebar />}
        <CSSTransition
          in
          appear
          timeout={{ appear: 2000 }}
          classNames={{ appear: styles.bubbleAppear, enter: 'enter' }}
        >
          <button
            className={classnames(
              'items-center bn shadow-1 pa4 pa5-m br-100 pointer outline-0',
              {
                'dn flex-m bg-base': open,
                'flex bg-action-primary': !open,
              }
            )}
            onClick={handleBubbleClick}
          >
            {open ? <IconClose size={24} /> : <CartmanIcon />}
          </button>
        </CSSTransition>
      </div>
    </CartmanProvider>,
    containerElement
  )
}

export default CartmanBubble
