import React from 'react'
import { useContext } from 'react'
import NotificationContext from 'context/notificationContext'
const NotificationBar = () => {
  const notificationCtx = useContext(NotificationContext)
  return (
    notificationCtx.notification !== null && (
      <div className={notificationCtx.notification}>
        <p> notificationCtx.notificationText </p>
      </div>
    )
  )
}
export default NotificationBar
