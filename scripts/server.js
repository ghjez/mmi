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

app.get('/accessibility', (req, res) => {
    var accessibility = fs.readFileSync('storage/accessibility.json', 'utf8');
    res.status(200);
    res.json(accessibility);
});

app.put('/accessibility', (req, res) => {
    var newValues = req.body;
    var accessibility = JSON.parse(fs.readFileSync('storage/accessibility.json', 'utf8'));
    
    accessibility.font_size = newValues.font_size;
    accessibility.mobile_font_size = newValues.mobile_font_size;
    accessibility.simple_text = newValues.simple_text;
    accessibility.contrast = newValues.contrast;
    accessibility.original_text = accessibility.original_text;
    accessibility.simplified_text = accessibility.simplified_text;

    accessibility = JSON.stringify(accessibility);
    fs.writeFileSync('storage/accessibility.json', accessibility); 
    res.status(201);
});


app.listen(8085, () => {
    console.log("Server running on port 8085");
});

