import React from 'react'

import styles from './Button.module.css'

export default function Button(props) {
  return (
    <button
      {...props}
      className={
        props.className ? styles.buttonPushable + ' ' + props.className : styles.buttonPushable
      }
      role='button'
    >
      <span className={styles.buttonShadow}></span>
      <span className={styles.buttonEdge}></span>
      <span className={styles.buttonFront}>{props.children}</span>
    </button>
  )
}
