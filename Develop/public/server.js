const express = require('express');
const path = require ('path');
const db = require('./db/db.json');
const fs = require('fs');
// const { notStrictEqual } = require('assert');


const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets'));

// homepage path
app.use(express.static(path.join(__dirname,'assets')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// notes page path
app.get('/notes/', (req,res) => res.sendFile(path.join(__dirname, 'notes.html')));

// gets stored notes
app.get('/api/notes', (req,res)=> res.sendFile(path.join(__dirname, 'db/db.json')));



// post to the db.json file
app.post('/api/notes',(req,res) =>{
    let newNotes = req.body;

    fs.readFile('./db/db.json',(err,data)=>{
        if (err) throw err;

        dbNotes = JSON.parse(data)
        dbNotes.push(newNotes)
        let number = 1;
        dbNotes.forEach((note,index)=>{
            note.id=number;
            number++;
            return dbNotes;
        });
        console.log(dbNotes);
        stringNotes = JSON.stringify(dbNotes);

        fs.writeFile('./db/db.json', stringNotes, (err,data)=>{
            if (err) throw err;
        });
    });
    res.sendFile(path.join(__dirname, 'notes.html'))
});

// starts the server and listens
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
 