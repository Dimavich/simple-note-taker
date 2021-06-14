const express = require('express');
const path = require ('path');
const db = require('./public/db/db.json');
const fs = require('fs');
// const { notStrictEqual } = require('assert');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));
app.use(express.static('public/assets'));

// homepage path
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public/assets')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// notes page path
app.get('/notes/', (req,res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// gets stored notes
app.get('/api/notes', (req,res)=> res.sendFile(path.join(__dirname, '/public/db/db.json')));



// post rout
app.post('/api/notes',(req,res) =>{
    let newNotes = req.body;

    fs.readFile('./public/db/db.json',(err,data)=>{
        if (err) throw err;

        dbNotes = JSON.parse(data)
        dbNotes.push(newNotes)
        let number = 1;
        dbNotes.forEach((note)=>{
            note.id=number;
            number++;
            return dbNotes;
        });
        console.log('Note added');
        stringNotes = JSON.stringify(dbNotes);

        fs.writeFile('./public/db/db.json', stringNotes, (err,data)=>{
            if (err) throw err;
        });
    });
    res.send('done!');
});


// starts the server and listens
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
 