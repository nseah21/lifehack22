import React from 'react'
import './SubmitReport.css'
import { db } from 'firebase.js'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export default function SubmitReport() {
  const scamList = [
    'Hacking Scam',
    'Impersonation Scam',
    'Kidnapping Scam',
    'Loan',
    'Online Purchase Scam',
    'Phishing Scam',
    'Others',
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()

    const number = formatQuery(event.target[0].value)
    const url = formatQuery(event.target[1].value)
    const details = event.target[2].value
    let tag = 'NA'

    for (let i = 3; i < event.target.length - 1; i++) {
      if (event.target[i].checked) {
        tag = event.target[i].attributes.scam.nodeValue
        event.target[i].checked = false
      }
    }

    if (number === '' && url !== '') {
      const docRef = doc(db, 'reports', url)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        let oldDetails = docSnap.data().info
        oldDetails.push(details)

        let oldTags = docSnap.data().tags
        oldTags.push(tag)

        updateDoc(docRef, {
          count: docSnap.data().count + 1,
          info: oldDetails,
          tags: oldTags,
        })
      } else {
        setDoc(docRef, { count: 1, info: [details], tags: [tag] })
      }
    } else {
      const docRef = doc(db, 'reports', number)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        let oldDetails = docSnap.data().info
        oldDetails.push(details)

        let oldTags = docSnap.data().tags
        oldTags.push(tag)

        updateDoc(docRef, {
          count: docSnap.data().count + 1,
          info: oldDetails,
          tags: oldTags,
        })
      } else {
        setDoc(docRef, { count: 1, info: [details], tags: [tag] })
      }
      event.target[0].value = ''
      event.target[1].value = ''
      event.target[2].value = ''
      event.target[3].value = ''
    }
  }

  const formatQuery = (query) => {
    const noSpaces = query.replace(/\s/g, '')
    return noSpaces
  }

  return (
    <div>
      <h1>REPORT YOUR SCAMS HERE</h1>
      <form className='form' onSubmit={(event) => handleSubmit(event)}>
        <label>Enter phone number of scammer</label>
        <input placeholder='Leave blank if not applicable'></input>
        <label>Enter website address of scammer</label>
        <input placeholder='Leave blank if not applicable'></input>
        <label>Let us know what happened</label>
        <textarea rows='4'></textarea>
        <div>
          <div>What category does this scam fall under?</div>
          {scamList.map((scam) => {
            return (
              <div key={scam}>
                <input type='radio' name='scam' scam={`${scam}`} />
                <label>{scam}</label>
              </div>
            )
          })}
        </div>
        <button className='button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}
