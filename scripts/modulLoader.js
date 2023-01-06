const modul_block_1 = '<a href="" class="modul"><img src="';
    
const modul_block_2 = '" alt="Bild von der Modul Thumbnail"><label for="modul" class="modul-title">'
const modul_block_3 = '</label></a>'

var feed = document.getElementById("feed");
var row = document.getElementById("row");
var cols = document.getElementsByClassName("column");

var not_resized = false;

function loadModules() {
    fetch("http://localhost:8080/module",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let module = JSON.parse(data);
        insertBlocks(module);
      });
}); }


function createBlock(module, pos) {
    let modul_block = modul_block_1 + module.modulenlist[pos].src + modul_block_2 + module.modulenlist[pos].name + "<br>" + module.modulenlist[pos].numcode + modul_block_3;
    console.log(modul_block);
    return modul_block;
}

function insertBlocks(module) {
    let x = window.matchMedia("(max-width: 800px)");
    let max_col_capacity = 0;

    if (x.matches) { // If media query matches
      max_col_capacity = module.modulenlist.length / 2;
    } else {
      max_col_capacity = module.modulenlist.length / 3;
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
}

function reloadOnResize() {
  let x = window.matchMedia("(max-width: 800px)");
  // // let y = window.matchMedia("(min-width: 801px)");
  // if(x.matches) {
  //   for(let col in cols) {
  //     col.innerHTML = "";
  //   }
  //   loadModules();
  // }
}

loadModules();

window.onresize = reloadOnResize;


