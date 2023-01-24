var students = document.getElementById("students");
var guide_div = document.getElementById("guide");
var template1 = `<li><a class="student"><label class="kurs-label">`;
var template2= `</label>`;
var the_tag = `<span class="material-icons">accessibility_new</span></a>`;
var template3 = `</li>`;
var is_closed = true;
var guide = true;

function openGuide() {
    if(guide == true) {
        guide_div.style.display = "flex";
    }
    else if(guide == false){
        guide_div.style.display = "none";
    }
    guide = !guide;
}

function openList() {
    fetch("http://localhost:8085/students",{
    method:"get",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
        response.json().then(function(data){
            let list = JSON.parse(data);
            fillList(list);
        });
    });
    
}

function createEntry(entry) {
    if(entry.tag == true) return template1 + entry.vorname + " " + entry.name + " @" + entry.nickname + template2 + the_tag + template3; 
    else return template1 + entry.vorname + " " + entry.name + " @" + entry.nickname + template2 + template3; 
} 

function fillList(list) {
    if(is_closed == true) {
        for(let i = 0; i < list.studentlist.length; i++) {
            students.innerHTML += createEntry(list.studentlist[i]);
        }
    }
    else if(is_closed == false){
        students.innerHTML = '';
    }
    is_closed = !is_closed;
}