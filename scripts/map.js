var back_btn = document.getElementById("back");
var route_btn = document.getElementById("route");
var map_img = document.getElementById("map");
var contrast;

function getSettings() {
    fetch("http://localhost:8085/accessibility",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let accessibility = JSON.parse(data);
        setContrast(accessibility);
      });
    }); 
}

function setContrast(accessibility) {
    if(accessibility.contrast) contrast = true;
    else contrast = false;

    if(contrast) map_img.src = "./storage/map/rub_map_bw_normal.svg";
    else map_img.src = "./storage/map/rub_map_normal.svg";
}

getSettings();

back_btn.addEventListener("click", () => {
    window.location.href = "./accessibility.html";
})

route_btn.addEventListener("click", () => {
    console.log(contrast);
    if(contrast) map_img.src = "./storage/map/rub_map_bw_ov.svg";
    else map_img.src = "./storage/map/rub_map_ov.svg";
})