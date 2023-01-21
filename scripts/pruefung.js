var mainElem = document.getElementsByTagName("main")[0];
var kursBtn = document.getElementById("kurs-pruefungen");
var pruefungBtns = document.getElementsByClassName("pruefung");

function closePopup(){
    var popup = document.getElementById("popup-div");
    popup.remove();
}

function einschreiben(){
    //TODO: Einschreiben
    closePopup();
}
function pruefungPopup(){
    console.log(mainElem);
    mainElem.innerHTML += `<div id="popup-div">
        <button id="close-popup">X</button>
        <h1 class="pruefung-h1">Prüfung</h1>
        <p>Fach: Informatik I</p>
        <p>Datum: 12.12.2012</p>
        <p>Uhrzeit: 12:00</p>
        <p>Raum: HZO 110</p>
        <button id="pruefung-einschreibe-button">Einschreiben</button>
    </div>`;
    var closeBtn = document.getElementById("close-popup");
    closeBtn.addEventListener("click", closePopup);
    var einschreibeBtn = document.getElementById("pruefung-einschreibe-button");
    einschreibeBtn.addEventListener("click", einschreiben);
}

kursBtn.addEventListener("click", pruefungPopup);
pruefungBtns.forEach(elem =>{
    elem.addEventListener("click", pruefungPopup);
});