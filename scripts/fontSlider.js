var font_range = document.getElementById('font-range');
const minus_btn = document.getElementById('minus_btn');
const plus_btn = document.getElementById('plus_btn');

var slider_value = 50;
font_range.value = slider_value;

function updateFontSize() {
    font_range.value = slider_value;
    font_range.style.setProperty('--value', font_range.value);
}

function increaseFontSize() {
    if(slider_value <= 90) slider_value += 10;
    updateFontSize();
}

function decreaseFontSize() {
    if(slider_value >= 10) slider_value -= 10;
    updateFontSize();
}

minus_btn.addEventListener("click", decreaseFontSize);
plus_btn.addEventListener("click", increaseFontSize);
