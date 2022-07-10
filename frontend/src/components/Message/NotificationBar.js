import React from 'react'
import { useContext } from 'react'
import { NotificationContext } from 'components'

import styles from './NotificationBar.module.css'

const NotificationBar = () => {
  const notificationCtx = useContext(NotificationContext)
  return (
    notificationCtx.notification !== null && (
      <div className={styles[notificationCtx.notification]}>
        <span>{notificationCtx.notificationText}</span>
      </div>
    )
  )
}
export default NotificationBar
