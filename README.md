# Backazon - User Analytics Microservice
Online consumer products marketplace.


[User Stories](https://docs.google.com/document/d/1-2410YObVQiQ_ki3VHkMOt2EF3Lx2sY7Z468WK5ktf0/edit)  
[App Plan](https://docs.google.com/document/d/1oRRk7g_4DCMgJMwuvC3tTENw1iWPoHeU-kxoD4Ce78w/edit#)  
[System Architecture](https://docs.google.com/document/d/1-2410YObVQiQ_ki3VHkMOt2EF3Lx2sY7Z468WK5ktf0/edit)  

# Folders
---
## Artillery
- Artillery yml files to stress test my application (How many rps my app can handle)

## Database
- I tested 3 different databases and timed them all. CouchDB, MongoDB, and CassandraDB were the 3 databases that I tested.  
- I ultimately went with CassandraDB.

## Documentation
- This is documentation that I have created on things that I have learned along the way of implementing this application.

## Generate Data
- This folder is the scripts to generate data to be filled inside my CassandraDB (10m records)

## Parser
- Utility parser to help with data formatting

## Queue
- Connected with AWS Queue to POST to Filtering Micro-service Analytics Queue and also to GET/POLL from Analytics Queue

## Server
- The server folder that connects to the database and a list of all the API's of the User Analytics application

## Test
- I created this application with the Test Driven Development philosophy, writing tests firsts and then implementing functionality.   
- This folder is all of my tests.

## Requirements
Node 9.4  
NPM 5.6  
CassandraDB  

## Run application
npm install  
npm start  
