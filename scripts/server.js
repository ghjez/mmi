const express = require("express");
const fs = require('fs');
const cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

app.get('/module', (req, res) => {
    var modulList = fs.readFileSync('storage/module.json', 'utf8');
    res.status(200);
    res.json(modulList);
});

app.get('/profile', (req, res) => {
    var profil = fs.readFileSync('storage/profil.json', 'utf8');
    res.status(200);
    res.json(profil);
});

app.put('/profile', (req, res) => {
    var newValues = req.body;
    var profil = JSON.parse(fs.readFileSync('storage/profil.json', 'utf8'));
    
    profil.vorname = newValues.vorname;
    profil.name = newValues.name;
    profil.nickname = newValues.nickname;

    profil = JSON.stringify(profil);
    fs.writeFileSync('storage/profil.json', profil); 
    res.status(201);
});


app.listen(8085, () => {
    console.log("Server running on port 8085");
});

