const express = require('express');
const path = require ('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets'));
// homepage path
app.use(express.static(path.join(__dirname,'assets')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// notes page path
app.use('/notes/', (req,res) => res.sendFile(path.join(__dirname, 'notes.html')))

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
