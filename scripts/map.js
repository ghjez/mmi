var back_btn = document.getElementById("back");
var route_btn = document.getElementById("route");
var map_img = document.getElementById("map");

map_img.src = "./storage/rub_map.svg";

back_btn.addEventListener("click", () => {
    window.location.href = "./accessibility.html";
})

route_btn.addEventListener("click", () => {
    map_img.src = "./storage/rub_map_overlay_full.svg";
})