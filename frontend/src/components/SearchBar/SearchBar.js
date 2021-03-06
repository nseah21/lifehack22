import React, { useContext, useState } from 'react'
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  query,
  collection,
  where,
} from 'firebase/firestore'
import { db } from 'firebase.js'
import { Button, ScamDetails, NotificationContext } from 'components'
import styles from './SearchBar.module.css'

const regex = /(\+?65)?( *)((6|8|9)\d{7})/

export default function SearchBar() {
  const scamList = [
    'Hacking Scam',
    'Impersonation Scam',
    'Kidnapping Scam',
    'Loan',
    'Online Purchase Scam',
    'Phishing Scam',
    'Others',
  ]

  const [searchedData, setSearchedData] = useState([])
  const [showScore, setShowScore] = useState(false)

  const formatQuery = (query) => {
    const noSpaces = query.replace(/\s/g, '')
    return noSpaces
  }
  const ctx = useContext(NotificationContext)
  const handleSearch = async (event) => {
    // only supports 1 tag
    event.preventDefault()
    setSearchedData([])
    let source = ''
    if (event.target[0].value !== '') {
      source = formatQuery(event.target[0].value)
      const match = source.match(regex)
      if (match) {
        source = '+65' + match[3]
      }

      event.target[0].value = ''
      const docRef = doc(db, 'reports', source)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setShowScore(true)
        setSearchedData([docSnap.data()])
        updateDoc(docRef, {
          searches: docSnap.data().searches ? docSnap.data().searches + 1 : 1,
        })
      } else {
        setDoc(docRef, { count: 0, info: [], tags: [], searches: 1 })
        setSearchedData([])
      }
    } else {
      source = []
      for (let i = 2; i < event.target.length - 1; i++) {
        if (event.target[i].checked) {
          source.push(event.target[i].attributes.name.nodeValue)
          event.target[i].checked = false
        }
      }
      console.log(source)

      if (source.length == 0) {
        return
      }

      const q = query(collection(db, 'reports'), where('tags', 'array-contains-any', source))
      const querySnapshot = await getDocs(q)
      const arrayOfDocuments = []

      querySnapshot.forEach((doc) => {
        arrayOfDocuments.push(doc.data())
      })
      setSearchedData(arrayOfDocuments)
    }

    source = []
    for (let i = 2; i < event.target.length - 1; i++) {
      if (event.target[i].checked) {
        source.push(event.target[i].attributes.name.nodeValue)
        event.target[i].checked = false
      }
    }

    if (source.length == 0) {
      if (searchedData.length === 0) {
        ctx.error('No results found')
      }
      return
    }

    const q = query(collection(db, 'reports'), where('tags', 'array-contains-any', source))
    const querySnapshot = await getDocs(q)
    const arrayOfDocuments = []

    querySnapshot.forEach((doc) => {
      arrayOfDocuments.push(doc.data())
    })
    setSearchedData(arrayOfDocuments)
    if (searchedData.length === 0) {
      ctx.error('No results found')
    }
  }

  return (
    <>
      <form onSubmit={(event) => handleSearch(event)} className={styles.searchForm}>
        <div className={styles.searchBar}>
          <label>Enter a phone number or website address to check for scams</label>
          <input placeholder=''></input>
        </div>
        <fieldset className={styles.searchTags}>
          <legend>Or... select the types of scams you wish to see</legend>
          {scamList.map((scam) => {
            return (
              <div key={scam}>
                <input type='checkbox' name={`${scam}`} />
                <label>{scam}</label>
              </div>
            )
          })}
        </fieldset>
        <Button type='submit' className={styles.searchButton}>
          Submit
        </Button>
        <ScamDetails searchedData={searchedData} showScore={showScore} />
      </form>
    </>
  )
}
