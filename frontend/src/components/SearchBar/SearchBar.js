import React, { useState } from 'react'
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
import { Button, ScamDetails } from 'components'
import styles from './SearchBar.module.css'

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
  const [currentSearch, setCurrentSearch] = useState('')

  const handleSearch = async (event) => {
    // only supports 1 tag
    event.preventDefault()
    let source = ''
    if (event.target[0].value !== '') {
      source = event.target[0].value
      setCurrentSearch(source)
      event.target[0].value = ''
      const docRef = doc(db, 'reports', source)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setSearchedData([docSnap.data()])
        updateDoc(docRef, {
          searches: docSnap.data().searches ? docSnap.data().searches + 1 : 1,
        })
      } else {
        setDoc(docRef, { count: 0, info: [], tags: [], searches: 1 })
        setSearchedData([])
      }
      return
    }

    source = []
    for (let i = 2; i < event.target.length - 1; i++) {
      if (event.target[i].checked) {
        source.push(event.target[i].attributes.name.nodeValue)
        event.target[i].checked = false
      }
    }

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
        {searchedData.length !== 0 ? (
          <div>
            <h2>Potential scammer: {currentSearch}</h2>
            <h3>Scam details</h3>
          </div>
        ) : (
          <div></div>
        )}
        <ScamDetails searchedData={searchedData} />
      </form>
    </>
  )
}
