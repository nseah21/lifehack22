import React, { useState } from 'react'
import { SearchBar } from 'components'

export default function Home() {
  const [data, setData] = useState([])
  const fetchData = () => {}

  return (
    <>
      <SearchBar />
      {data.map((report, index) => {
        return (
          <div key={index}>
            <h1>RECENT SCAMS</h1>
            <div>
              <strong>Scammer number:</strong>
              {report.number}
            </div>
            <div>
              <strong>Scammer website:</strong>
              {report.website}
            </div>
            <div>
              <strong>Victim story:</strong>
              {report.story}
            </div>
          </div>
        )
      })}
    </>
  )
}
