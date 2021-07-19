const fs = require('fs');
const path = require('path');
const express = require ('express');
const PORT = process.env.PORT || 3002;
const app = express();
const crypto = require("crypto");
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// Express.js middleware
app.use(express.static('public'));
//required  note data
let { noteData } = require('./db/db');
const { captureRejectionSymbol } = require('events');

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
  // create function to add note to db.json file
  function addNewNote(body, noteArr) {
      console.log (body);
      // main code
      const note = body;
      noteArr.push(note);
      fs.writeFileSync (
          path.join(__dirname, './db/db.json'),
          JSON.stringify({noteData:noteArr})
      );
      return addNewNote;
  }

  app.post ('/api/notes', (req, res) => {
      console.log (req.body);
      // add note to json file
      let id = crypto.randomBytes(16).toString("hex");
      req.body.id = id;
      console.log(id);
      const note = addNewNote(req.body, noteData);
      res.json(note);
  });

  app.delete ('/api/notes/:id', (req, res) => {
      const { id } = req.params;
      console.log (req.params)

      let deletme_id = noteData.find(noteData => noteData.id === id);
      console.log (deletme_id);
     
       if (deletme_id) {
           noteData = noteData.filter (noteData => noteData.id !== id)
           res.end();
           res.status(200)
       } else {
           res.status(404).json({message: "Note you are looking for does not exist :-( !"})
       }
       
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