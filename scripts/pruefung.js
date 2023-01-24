var mainElem = document.getElementsByTagName("main")[0];
var kursBtn = document.getElementById("kurs-pruefungen");
var pruefungBtns = document.getElementsByClassName("pruefung");
var registered = document.getElementById("registered");
var available = document.getElementById("available");

var examBlock1 = `<button class="pruefung" onclick="pruefungPopup(this)">`;
var examBlock1reg = `<button class="pruefung" onclick="removeExam(this)">`;
var examBlockLabel = `<label for="pruefung">`;
var examBlockDate = `</label><p class="date">`;
var examBlockDateEnd = `</p>`;
var examBlock2 = `</button>`;

console.log(mainElem);
function closePopup(){
    var popup = document.getElementById("popup-div");
    popup.remove();
}

function einschreiben(the_name, datum){
    //TODO: Einschreiben
    fetch("http://localhost:8085/register",{
    method:"put",
    body: JSON.stringify({
      name: the_name,
      date: datum
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' },
    });
    closePopup();
    // loadRegistered();
    location.reload();
}

function loadAvailable() {
    fetch("http://localhost:8085/module",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let module = JSON.parse(data);
        renewAvailable(module);
      });
}); }

function loadRegistered() {
    fetch("http://localhost:8085/register",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let module = JSON.parse(data);
        renewRegistration(module);
      });
}); }

function removeExam(exam) {
    mainElem.innerHTML += `<div id="popup-div">
        <button id="close-popup"><span class="material-symbols-outlined">
        close
        </span></button>
        <h1 class="pruefung-h1">Möchten Sie von dieser Prüfung abmelden?</h1>
        <ul id="info">
        <li><label>Fach:</label><p id="the-name">Informatik I</p></li>
        </ul>
        <button id="pruefung-loschen-button">Abmelden</button>
    </div>`;
    var closeBtn = document.getElementById("close-popup");
    closeBtn.addEventListener("click", closePopup);
    var deleteBtn = document.getElementById("pruefung-loschen-button");
    let name_area = document.getElementById("the-name");
    name_area.textContent = exam.textContent;
    the_name = exam.getElementsByTagName("label")[0].textContent;
    the_date = exam.getElementsByTagName("p")[0].textContent.slice(8);
    console.log(the_name);
    deleteBtn.addEventListener("click", () => {
        fetch("http://localhost:8085/register",{
            method:"delete",
            body: JSON.stringify({
                name: the_name,
                date: the_date
            }),
            headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, });
        exam.remove();
        location.reload();
    })
}

function pruefungPopup(dad_exam){
    console.log(dad_exam);
    console.log(mainElem);
    mainElem.innerHTML += `<div id="popup-div">
        <button id="close-popup"><span class="material-symbols-outlined">
        close
        </span></button>
        <h1 class="pruefung-h1">Prüfung</h1>
        <ul id="info">
        <li><label>Fach:</label><p id="the-name">Informatik I</p></li>
        <li><label>Termin(e):</label> <select name="pruefungen" id="pruefungen">
                        <option value="12.02.2023">12.02.2023</option>
                        <option value="14.03.2023">14.03.2023</option>
                        <option value="06.10.2023">06.10.2023</option>
                    </select></li>
        <li><label>Uhrzeit:</label><p>12:00</p></li>
        <li><label>Raum:</label><p>HZO 110</p></li>
        </ul>
        <button id="pruefung-einschreibe-button">Einschreiben</button>
        
    </div>`;
    var closeBtn = document.getElementById("close-popup");
    closeBtn.addEventListener("click", closePopup);
    var einschreibeBtn = document.getElementById("pruefung-einschreibe-button");
    let name_area = document.getElementById("the-name");
    name_area.textContent = dad_exam.textContent;
    // einschreibeBtn.addEventListener("click", einschreiben);
    einschreibeBtn.addEventListener("click",() => {
        let the_name = dad_exam.textContent;
        let datum = document.getElementById("pruefungen").value;
        console.log(the_name, datum);
        einschreiben(the_name, datum);
      });
}

function renewRegistration(exams) {
    for(let i = 0; i < exams.pruefungen.length; i++) {
        registered.innerHTML += examBlock1reg + examBlockLabel + exams.pruefungen[i].name + examBlockDate + " Datum: " + exams.pruefungen[i].date + examBlockDateEnd + examBlock2;
    }
}

function renewAvailable(module) {
    // console.log(module.modulenlist);
    for(let i = 0; i < module.modulenlist.length; i++) {
        available.innerHTML += examBlock1 + module.modulenlist[i].name + examBlock2;
    }
}

loadAvailable();
loadRegistered();

if(typeof kursBtn === "object" && kursBtn != null) kursBtn.addEventListener("click", pruefungPopup);
if(typeof pruefungBtns.forEach === "function") {
    pruefungBtns.forEach(elem =>{
        elem.addEventListener("click", pruefungPopup);
    });
}