var font_range = document.getElementById('font-range');
const minus_btn = document.getElementById('minus_btn');
const plus_btn = document.getElementById('plus_btn');
var font_size_demo = document.getElementById("font-size-demo");

var slider_value = 50;
font_range.value = slider_value;

function updateFontSize() {
    font_range.value = slider_value;
    
    font_range.style.setProperty('--value', font_range.value);
    font_size_demo.style.fontSize = "";
    font_size_demo.style.fontSize = slider_value * 0.02 + "vw"; 
    // console.log(slider_value);
}

function updateFontSizeSlider() {
    slider_value = font_range.value;

    font_size_demo.style.fontSize = "";
    font_size_demo.style.fontSize = slider_value * 0.02 + "vw"; 
    // console.log(slider_value);
}


function increaseFontSize() {
    if((parseFloat(slider_value) + 10) <= 100) slider_value = parseFloat(slider_value) + 10;
    else slider_value = 100;
    updateFontSize();
}

function decreaseFontSize() {
    if((parseFloat(slider_value) - 10) >= 0) slider_value = parseFloat(slider_value) - 10;
    else slider_value = 0;
    updateFontSize();
}

minus_btn.addEventListener("click", decreaseFontSize);
plus_btn.addEventListener("click", increaseFontSize);
