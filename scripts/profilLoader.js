const modul_block_1= '<button href="" class="profil-btn"><label for="profil" class="profil-title">';
const modul_block_2 = '</label>'
const modul_block_3 = '</button>';

// The order of icons has to correspond to the order of buttons
const icons = [
  {name: "planner", value: `<span class="material-symbols-outlined">date_range</span>`},
  {name: "stud-bescheinigung", value: `<span class="material-symbols-outlined">assignment</span>`},
  {name: "verlaufsplan", value: `<span class="material-symbols-outlined">table</span>`},
  {name: "leistung", value: `<span class="material-symbols-outlined">school</span>`},
  {name: "bib-ausweis", value: `<span class="material-icons">menu_book</span>`},
  {name: "loginID", value: `<span class="material-symbols-outlined">lock</span>`},
  {name: "ticket", value: `<span class="material-symbols-outlined">directions_bus</span>`},
  {name: "konto-beitrag", value: `<span class="material-symbols-outlined">euro_symbol</span>`},
  {name: "rub-mail", value: `<span class="material-symbols-outlined">mail</span>`},
]

const profileButtons=[
  {name: "Mein Planner", src:"", link:""},
  {name: "Studienbescheinigung", src:"", link:""},
  {name: "Studienverlaufsplan", src:"", link:""},
  {name: "Leistungsnachweise", src:"", link:""},
  {name: "Bibliothekausweis", src:"", link:""},
  {name: "LoginID", src:"", link:""},
  {name: "ÖPNV Ticket", src:"", link:""},
  {name: "Konto und Sozialbetrag", src:"", link:""},
  {name: "RUB-Mail", src:"", link:""}

]

var feed = document.getElementById("feed");
var row = document.getElementById("row");
var cols = document.getElementsByClassName("column");
var prev_width = window.innerWidth; 

var vorname = document.getElementById("vorname");
var f_name = document.getElementById("nachname");
var nickname = document.getElementById("nickname");
var profile_fields = [vorname, f_name, nickname];

var bearbeiten_btn = document.getElementById("bearbeiten-btn");
var bearbeiten_btn_label = document.getElementById("bearbeiten-btn-label");
var bearbeiten_btn_icon = document.getElementById("bearbeiten-btn-icon");
var profil_img = document.getElementById("userpic_img");
var change_img = document.getElementById("change_img");
var editing = false;

function loadProfile() {
  fetch("http://localhost:8085/profile",{
    method:"get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' }
  }).then(function(response){
    response.json().then(function(data){
      let profile = JSON.parse(data);
      initProfile(profile);
    });
}); }

function setProfile() {
  fetch("http://localhost:8085/profile",{
    method:"put",
    body: JSON.stringify({
      vorname: vorname.value,
      name: f_name.value,
      nickname: nickname.value
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' },
    });
}

function createBlock(pos) {
  let modul_block = modul_block_1 + profileButtons[pos].name + modul_block_2 + icons[pos].value + modul_block_3;
  return modul_block;
}

function insertBlocks() {
  console.log("insertBlocks");
    let x = window.matchMedia("(max-width: 800px)");
    let max_col_capacity = 0;

    if (x.matches) { // If media query matches
      max_col_capacity = profileButtons.length / 2;
    } else {
      max_col_capacity = profileButtons.length / 3;
    } 
    console.log("max_col_capacity: " + max_col_capacity );

    let index = 0;
    let cur_column = cols[index];

    let capacity_counter = 0;
    for(let i = 0; i < profileButtons.length; i++) {
        let modul_block = createBlock(i);

        if(capacity_counter >= max_col_capacity) { 
            index += 1; 
            capacity_counter = 0;
            cur_column = cols[index];
        }
        cur_column.innerHTML += modul_block;
        capacity_counter += 1;

        console.log("index: " + index);
    }
}

function reloadmk2(){
  if((window.innerWidth<=800) && (prev_width>800)){
    for(var i = 0; i < cols.length; i++) {
      cols[i].innerHTML = "";
    }
  
    //make 2 columns
    insertBlocks()
  }
  else if((window.innerWidth>800) && (prev_width<=800)){
    for(var i = 0; i < cols.length; i++) {
      cols[i].innerHTML = "";
    }
  
    //make 3 columns
    insertBlocks()
  }
  
  prev_width=window.innerWidth
}

console.log(profileButtons)
insertBlocks();
loadProfile();
// window.onresize = reloadmk2;

function loadNewImg(event) {
  profil_img.src = URL.createObjectURL(event.target.files[0]);
}

function initProfile(profile) {
  editing = false;
  bearbeiten_btn_label.textContent = "Bearbeiten";
  bearbeiten_btn_icon.textContent = "edit";
  for(let i = 0; i < profile_fields.length; i++) {
    vorname.value = profile.vorname;
    f_name.value = profile.name;
    nickname.value = profile.nickname;

    profile_fields[i].style.border = "none";
    profile_fields[i].readOnly = true;
  }
  profil_img.style.cursor = "default";
  // change_img.hidden = true;
}


bearbeiten_btn.addEventListener("click", () => {
  if(editing) {
    setProfile();
    editing = false;
    bearbeiten_btn_label.textContent = "Bearbeiten";
    bearbeiten_btn_icon.textContent = "edit";
    for(let i = 0; i < profile_fields.length; i++) {
      profile_fields[i].style.border = "none";
      profile_fields[i].readOnly = true;
    }
    profil_img.style.cursor = "default";
    // change_img.hidden = true;
  }
  else {
    editing = true;
    bearbeiten_btn_label.textContent = "Speichern";
    bearbeiten_btn_icon.textContent = "done";
    for(let i = 0; i < profile_fields.length; i++) {
      profile_fields[i].style.border = "#1F3659 solid .1vw";
      profile_fields[i].readOnly = false;
    }

    profil_img.style.cursor = "pointer";
    // change_img.hidden = false;
    
  }
})


