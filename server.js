const fs = require('fs');
const path = require('path');
const express = require ('express');
const PORT = process.env.PORT || 3002;
const app = express();

//required  note data
const { noteData } = require('./db/db');

//add test route
// test #1
/*
app.get('/api/noteData', (req, res) => {
    res.send ('Hi, Robert , do you see me?');
});
*/
// test #2 use res.json

app.get('/api/noteData', (req, res) => {
    res.json(noteData);
});

// require index.html page
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
*/

// setup server port
app.listen(PORT,() => {
    console.log (`API server now on port  ${PORT}!`);
});