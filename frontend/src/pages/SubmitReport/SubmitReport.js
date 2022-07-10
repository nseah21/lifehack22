import React from 'react'
import './SubmitReport.css'
import { db } from 'firebase.js'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { Button } from 'components'

const regex = /(\+?65)?( *)((6|8|9)\d{7})/

export default function SubmitReport() {
  // const [error, setError] = useState(false);

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

    let number = formatQuery(event.target[0].value)
    const url = formatQuery(event.target[1].value)
    const details = event.target[2].value.trim()
    let tag = 'NA'

    const match = number.match(regex)

    if (!match) {
      return
    }

    number = '+65' + match[3]

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
          searches: docSnap.data()?.searches || 0,
        })
      } else {
        setDoc(docRef, { count: 1, info: [details], tags: [tag], searches: 0 })
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
    <div className='content'>
      <form className='form' onSubmit={(event) => handleSubmit(event)}>
        <h2>REPORT YOUR SCAMS HERE</h2>
        <label>Enter phone number of scammer</label>
        <input placeholder='Leave blank if not applicable' className='formBar'></input>
        <label>Enter website address of scammer</label>
        <input placeholder='Leave blank if not applicable' className='formBar'></input>
        <label>Let us know what happened</label>
        <textarea rows='4' className='formBar'></textarea>
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
        <Button className='button' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  )
}
