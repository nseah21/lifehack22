import React, { useState } from 'react'
import { doc, getDoc, getDocs, query, collection, where } from 'firebase/firestore'
import { db } from '../firebase'
import './SearchBar.css'

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

  const allTags = [
    'Loan',
    'Impersonation',
    'Phishing',
    'Online Purchase Scam',
    'Hacked Scam',
    'Kidnapping',
    'Others',
  ]

  const handleSearch = async (event) => {
    // only supports 1 tag
    event.preventDefault()
    let source = ''
    if (event.target[0].value !== '') {
      source = event.target[0].value
      const docRef = doc(db, 'reports', source)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setSearchedData([docSnap.data()])
      } else {
      }
    } else {
      source = []
      for (let i = 2; i < event.target.length - 1; i++) {
        if (event.target[i].checked) {
          source.push(event.target[i].attributes.name.nodeValue)
          event.target[i].checked = false
        }
      }
      const q = query(collection(db, 'reports'), where('tags', 'array-contains-any', source))
      const querySnapshot = await getDocs(q)
      const arrayOfDocuments = []

      querySnapshot.forEach((doc) => {
        arrayOfDocuments.push(doc.data())
      })
      setSearchedData(arrayOfDocuments)
    }

    // if (allTags.indexOf(source) !== -1) { // user is searching from a tag
    //   const q = query(collection(db, "reports"), where("tags", "array-contains-any", source))
    //   const querySnapshot = await getDocs(q);
    //   const arrayOfDocuments = [];

    //   querySnapshot.forEach((doc) => {
    //     arrayOfDocuments.push(doc.data());
    //   })
    //   setSearchedData(arrayOfDocuments);
    // } else {
    //     const docRef = doc(db, "reports", source);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //       setSearchedData([docSnap.data()])
    //     } else { }
    //   }
  }

  const formatResponse = (s) => {
    return s.replace(/\s/g, '')
  }

  return (
    <>
      <form onSubmit={(event) => handleSearch(event)} className='body'>
        <label>Enter a phone number or website address to check for scams</label>
        <input placeholder='' className='input'></input>
        <fieldset className='body'>
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
        <button type='submit' className='button'>
          Submit
        </button>
      </form>
      {console.log(searchedData)}
      {searchedData.length !== 0 ? (
        searchedData[0].info.map((details) => {
          return <div key={Math.random()}>{details}</div>
        })
      ) : (
        <div className='body'>No query entered. Fill in the search bar to look up common scams</div>
      )}
    </>
  )
}
