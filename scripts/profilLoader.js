const modul_block_1 = '<button href="" class="profil"><img src="';
const modul_block_2 = '" alt="Bild von der Modul Thumbnail"><label for="profil" class="profil-title">'
const modul_block_12= '<button href="" class="profil"><label for="profil" class="profil-title">'
const modul_block_3 = '</label></button>'

var feed = document.getElementById("feed");
var row = document.getElementById("row");
var cols = document.getElementsByClassName("column");
var prev_width = window.innerWidth; 

const profileButtons=[
  {name: "Mein Stundenplan", src:"", link:""},
  {name: "Studienbescheinigung", src:"", link:""},
  {name: "Studienverlaufsplan", src:"", link:""},
  {name: "Leistungsnachweise", src:"", link:""},
  {name: "Leistungsnachweise", src:"", link:""},
  {name: "Leistungsnachweise", src:"", link:""},
  {name: "Leistungsnachweise", src:"", link:""},
  {name: "Leistungsnachweise", src:"", link:""},
  {name: "Leistungsnachweise", src:"", link:""}

]

function createBlock(pos) {
  console.log(pos)
  //let modul_block = modul_block_1 + profileButtons[pos].src + modul_block_2 + profileButtons[pos].name + modul_block_3;
  let modul_block = modul_block_12 + profileButtons[pos].name + modul_block_3;
  console.log(modul_block);
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
window.onresize = reloadmk2;
