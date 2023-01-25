const express = require("express");
const fs = require('fs');
const cors = require('cors');
const e = require("cors");

var app = express();
app.use(express.json());
app.use(cors());

app.get('/module', (req, res) => {
    var modulList = fs.readFileSync('storage/module.json', 'utf8');
    res.status(200);
    res.json(modulList);
});

app.get('/search', (req, res) => {
    var modulList = fs.readFileSync('storage/module_search.json', 'utf8');
    res.status(200);
    res.json(modulList);
});

app.get('/students', (req, res) => {
    var students = fs.readFileSync('storage/students.json', 'utf8');
    res.status(200);
    res.json(students);
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

app.get('/register', (req, res) => {
    var register = fs.readFileSync('storage/angemeldete.json', 'utf8');
    res.status(200);
    res.json(register);
});

app.put('/register', (req, res) => {
    var newValues = req.body;
    var angemeldete = JSON.parse(fs.readFileSync('storage/angemeldete.json', 'utf8'));
    
    var new_registration = true;
    for(let i = 0; i < angemeldete.pruefungen.length; i++) {
        if((newValues.name == angemeldete.pruefungen[i].name) && (newValues.date == angemeldete.pruefungen[i].date)) new_registration = false;
    }
    if(typeof newValues.name == "undefined" || newValues.name == null) newValues.name = "Prüfung";
    if(new_registration) angemeldete.pruefungen.push(newValues);
    angemeldete = JSON.stringify(angemeldete);
    fs.writeFileSync('storage/angemeldete.json', angemeldete); 
    res.status(201);
});


app.delete('/register', (req, res) => {
    var examToDelete = req.body;
    var examFound = false;
    var examData = JSON.parse(fs.readFileSync('./storage/angemeldete.json','utf8'));
        for (exam in examData.pruefungen){
            if ((examToDelete.name == examData.pruefungen[exam].name) && (examToDelete.date == examData.pruefungen[exam].date)){
                examData.pruefungen.splice(exam, 1);
                examData = JSON.stringify(examData); fs.writeFileSync('./storage/angemeldete.json', examData); examFound = true;
                break;
    } }
        if(examFound){
            res.status(200);
            res.send("Exam deleted");
    } else{
            res.status(400);
            res.send("No exam by that Name found");
    } });

app.listen(8085, () => {
    console.log("Server running on port 8085");
});

