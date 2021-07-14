const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

var notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'),  'utf8'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {
    
    var newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), 'utf8');

    res.json(newNote);
  });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));