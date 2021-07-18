const fs = require('fs');
const path = require('path');
const express = require ('express');
const PORT = process.env.PORT || 3002;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// Express.js middleware
app.use(express.static('public'));
//required  note data
const { noteData } = require('./db/db');

//add test route
// test #1
/*
app.get('/api/noteData', (req, res) => {
    res.send ('Hi, Robert , do you see me?');
});
*/
// test #2 use db.json

app.get('/api/notes', (req, res) => {
    res.json(noteData);
});


// test 3#  display index page


  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  // require index.html page
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });
// create a GET route  that returns all of the notes
/*
app.get('/notes', (req, res) => {
    let results = noteData;
    console.log(req.query)
    res.json(results)
})
*/
  // setup server port
app.listen(PORT,() => {
    console.log (`API server now on port  ${PORT}!`);
});