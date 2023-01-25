const modul_block_1 = '<a href="#" onclick="modulPopup(this)" class="modul"><img src="';
    
const modul_block_2 = '" alt="Bild von der Modul Thumbnail"><label for="modul" class="modul-title">'
const modul_block_3 = '</label></a>'

var feed = document.getElementById("feed");
var row = document.getElementById("row");
var cols = document.getElementsByClassName("column");
var back_btn = document.getElementById("back");
var gefundene;
var prev_width = window.innerWidth; 

var current_module;
var all_module;

function loadModules() {
    fetch("http://localhost:8085/search",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let module = JSON.parse(data);
        insertBlocksLeftToRight(module);
        all_module = module;
      });
}); }


function createBlock(module, pos) {
    let modul_block = modul_block_1 + module.modulenlist[pos].src + modul_block_2 + module.modulenlist[pos].name + "<br>" + module.modulenlist[pos].numcode + modul_block_3;
    // console.log(modul_block);
    return modul_block;
}

function insertBlocksVertically(module) {
    let x = window.matchMedia("(max-width: 800px)");
    let max_col_capacity = 0;

    if (x.matches) { // If media query matches
      max_col_capacity = module.modulenlist.length / 2;
    } else {
      max_col_capacity = Math.ceil(module.modulenlist.length / 3);
    } 

    console.log(max_col_capacity);
    let index = 0;
    let cur_column = cols[index];
    let capacity_counter = 0;
    for(let i = 0; i < module.modulenlist.length; i++) {
        let modul_block = createBlock(module, i);

        if(capacity_counter >= max_col_capacity) { 
            index += 1; 
            capacity_counter = 0;
        }

        cur_column = cols[index];
        cur_column.innerHTML += modul_block;
        capacity_counter += 1;
    }

    current_module = module;
}

function insertBlocksLeftToRight(module) {
  let x = window.matchMedia("(max-width: 800px)");
  let max_col_capacity = 0;

  if (x.matches) { // If media query matches
    max_col_capacity = 2;
  } else {
    max_col_capacity = 3;
  } 

  // console.log(max_col_capacity);
  let index = 0;
  let cur_column = cols[index];
  for(let i = 0; i < module.modulenlist.length; i++) {
      let modul_block = createBlock(module, i);

      if(index >= max_col_capacity) { 
          index = 0;
      }

      cur_column = cols[index];
      cur_column.innerHTML += modul_block;
      index += 1;
  }

  current_module = module;
}

function reloadmk2(){
  if((window.innerWidth<=800) && (prev_width>800)){
    for(var i = 0; i < cols.length; i++) {
      cols[i].innerHTML = "";
    }
  
    //make 2 columns
    insertBlocksLeftToRight(current_module)
  }
  else if((window.innerWidth>800) && (prev_width<=800)){
    for(var i = 0; i < cols.length; i++) {
      cols[i].innerHTML = "";
    }
  
    //make 3 columns
    insertBlocksLeftToRight(current_module)
  }
  
  prev_width=window.innerWidth
}

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
}

function modulPopup(dad_module){
  // console.log(mainElem);
  feed.innerHTML += `<div id="popup-div">
      <button id="close-popup"><span class="material-symbols-outlined">
      close
      </span></button>
      <ul id="info">
        <li><label>Lehrveranstaltungsnummer:</label><p>12345</p></li>
        <li><label>Titel:</label><p>Informatik 1</p></li>
        <li><label>Veranstaltungsart:</label><p>Vorlesung mit Übung</p></li>
        <li><label>Kreditpunkte:</label><p>8 bzw. 9</p></li>
        <li><label>Dozent:</label><p>Prof. Dr. Tobias Glasmachers</p></li>
        <h1 class="termine-h1">Termine:</h1>
        <li>Vorlesung: <select name="vorlesung" id="vorlesung">
                        <option value="12.02.2023">12.02.2023</option>
                        <option value="14.03.2023">14.03.2023</option>
                        <option value="06.10.2023">06.10.2023</option>
                    </select></li>
        <li>Übung: <select name="uebung" id="uebung">
                    <option value="12.02.2023">12.02.2023</option>
                    <option value="14.03.2023">14.03.2023</option>
                    <option value="06.10.2023">06.10.2023</option>
                </select></li>
        <li>Klausur: <select name="klausur" id="klausur">
                      <option value="12.02.2023">12.02.2023</option>
                      <option value="14.03.2023">14.03.2023</option>
                      <option value="06.10.2023">06.10.2023</option>
                  </select></li>
      </ul>
      <button id="modul-einschreibe-button">Einschreiben</button>
  </div>`;

  // Find the module by name 
  let dad_name = String(dad_module.getElementsByClassName("modul-title")[0].innerHTML);
  let our_module;
  let temp = "";
 
  for(let i = 0; i < dad_name.length; i++) {
    if(dad_name[i] == "<") break;
    else temp += dad_name[i];
  }
  dad_name = temp;

  console.log(all_module.modulenlist);
  for(let i = 0; i < all_module.modulenlist.length; i++) {
    if(dad_name == all_module.modulenlist[i].name) {
      our_module = all_module.modulenlist[i]; 
      break;
    }
    // else console.log("not found");
  }
  console.log(our_module);

  // Placing all the infos in the found module
  var li_s = document.getElementById("info").getElementsByTagName("li");
  var p_s = [];
  var our_klausur = document.getElementById("klausur");
  if(our_module.klausur.length == 0) {
    our_klausur.parentElement.innerHTML += `<div id="notify-box"><input type="checkbox" id="notify"><label for="notify">Über den Termine mich informieren.</label></div>`;
    document.getElementById("klausur").remove();
  }

  for(let i = 0; i < li_s.length; i++) {
    let temp = li_s[i].getElementsByTagName("p")[0];
    if(typeof temp != "undefined") p_s.push(temp);
  }
  
  for(let i = 0; i < p_s.length; i++) {
    p_s[0].textContent = our_module.numcode;
    p_s[1].textContent = our_module.name;
    p_s[2].textContent = our_module.type;
    p_s[3].textContent = our_module.points;
    p_s[4].textContent = our_module.dozent;
  }
  
  var closeBtn = document.getElementById("close-popup");
  closeBtn.addEventListener("click", closePopup);
  var einschreibeBtn = document.getElementById("modul-einschreibe-button");
  einschreibeBtn.addEventListener("click",() => {
    datum = document.getElementById("klausur").value;
    console.log(datum);
    einschreiben(our_module.name, datum);
  });
  document.getElementById("popup-div").focus();
  remute();
}

loadModules();

back_btn.addEventListener("click", () => {
  window.location.href = "./index.html"
})

