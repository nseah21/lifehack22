import React, { useEffect, useState } from 'react'

import ReactScoreIndicator from 'react-score-indicator'
import styles from './ScamDetails.module.css'

function getScore(count, searches) {
  const base = count * 15 + searches
  const variance = Math.floor(Math.random() * 17)

  return Math.min(base + variance, 100)
}

const colors = [
  '#3da940',
  '#3da940',
  '#53b83a',
  '#84c42b',
  '#f1bc00',
  '#f1bc00',
  '#ed8d00',
  '#d12000',
]

let myCounter = 0
let timeout = null

export default function ScamDetails({ searchedData }) {
  if (searchedData.length == 0) {
    return
    // <div className={styles.searchMessage}>
    //   No query entered. Fill in the search bar to look up common scams
    // </div>
  }

  const [value, setValue] = useState(0)
  const score = getScore(searchedData[0].count, searchedData[0]?.searches || 0)

  useEffect(() => {
    startInterval()
    return () => clearInterval(timeout)
  }, [searchedData])

  myCounter = value
  const startInterval = () => {
    timeout = setInterval(() => {
      setValue((value) => value + 1)
      if (myCounter >= score) {
        clearInterval(timeout)
        setValue(score)
      }
    }, 2000 / score)
  }

  return (
    <>
      <ReactScoreIndicator value={value} maxValue={100} stepsColors={colors} />
      {searchedData[0].info.map((details, index) => {
        return (
          <div key={index} className={styles.scam}>
            <div>{'"' + details + '"'}</div>
          </div>
        )
      })}
    </>
  )
}
