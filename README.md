### Scam Detector
A simplified web application to help the elderly report and identify potential scams. 

### Features
Users can report malicious phone numbers or websites and provide their description of the modus operandi of said scams

Users can also search for suspicious phone numbers or websites to check for matching submissions and other users' stories

Database was populated with data scraped from scamalert.sg, which was cleaned, simplified and tagged for easy user reference. 

Search bar also provides a frequency meter to reflect the likelihood of a scam being real (based on tthe number of reports and searches) 

### Pitfalls
Scammers may utilize spoofed numbers, which is a huge oversight and workaround to our efforts in recording these numbers. These spoofed numbers could potentially be an individual's real phone number, which may present greater security risks to said individual.

### Running the application
Access the application on https://62ca2d3ea4c6be589d4e875d--brilliant-croissant-b9e821.netlify.app/ 

or 

test the application locally with the following:

In the project directory, run 
`npm install` 
and 
`npm start`

### Tech stack 
ReactJS
Firebase Cloud Firestore
Scrapy
