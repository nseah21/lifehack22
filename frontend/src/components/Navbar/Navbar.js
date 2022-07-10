import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarTitle}><Link to="/">Scam Detector</Link></div>

      <div className={styles.navbarLinks}>
        <Link to='report' className={styles.navbarLink}>
          Report
        </Link>
      </div>
    </div>
  )
}
