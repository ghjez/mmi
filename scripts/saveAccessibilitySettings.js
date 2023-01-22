// For contrast
var test_image = document.getElementById("test_image");
var contrast_toggle = document.getElementById("contrast");

// For simple language
var test_text = document.getElementById("easy-text-demo");
var simple_toggle = document.getElementById("simple-text");

// For font size
var font_range = document.getElementById('font-range');
const minus_btn = document.getElementById('minus_btn');
const plus_btn = document.getElementById('plus_btn');
var font_size_demo = document.getElementById("font-size-demo");

var slider_value = 50;

// For save/reset buttons
var save_btn = document.getElementById("save");
var reset_btn = document.getElementById("reset");

var window_prev_width = window.innerWidth; 

// All settings 
var font_size;
var mobile_font_size;
var simple_text;
var test_contrast;
var original_text;
var simplified_text;

var is_mobile;

function getSettings() {
    fetch("http://localhost:8085/accessibility",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let accessibility = JSON.parse(data);
        initSettings(accessibility);
      });
    }); 
}

function setSettings() {
    fetch("http://localhost:8085/accessibility",{
        method:"put",
        body: JSON.stringify({
            font_size: this.font_size,
            mobile_font_size: this.mobile_font_size,
            simple_text: this.simple_text,
            contrast: this.test_contrast,
            original_text: this.original_text,
            simplified_text: this.simplified_text
    }),
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
    });
}

function initSettings(accessibility) {
    console.log(accessibility);
    font_size = accessibility.font_size;
    mobile_font_size = accessibility.mobile_font_size;
    simple_text = accessibility.simple_text;
    test_contrast = accessibility.contrast;
    original_text = accessibility.original_text;
    simplified_text = accessibility.simplified_text;
    slider_value = parseFloat(font_size)/0.02;

    updateFontSize();
    updateContrastToggle();
    updateSimpleToggle();
    updateContrast();
    updateSimple();
}

function updateContrastToggle() {
    if(test_contrast) contrast_toggle.checked = true;
    else contrast_toggle.checked = false;
}

function updateContrast() {
    if(test_contrast) test_image.style.filter = "contrast(200%)";
    else test_image.style.filter = "contrast(100%)";
}

function updateSimpleToggle() {
    if(simple_text) simple_toggle.checked = true;
    else simple_toggle.checked = false;
}

function updateSimple() {
    if(simple_text) test_text.textContent = simplified_text;
    else test_text.textContent = original_text;
}

function updateFontSize() {
    font_range.value = slider_value;
    
    font_range.style.setProperty('--value', font_range.value);
    font_size_demo.style.fontSize = "";

    if(is_mobile) font_size = 3 + slider_value * 0.02 + "vw"
    else font_size = slider_value * 0.02 + "vw"; 
    font_size_demo.style.fontSize = font_size;
    console.log(font_size_demo.style.fontSize);
    // console.log(slider_value);
}

// Do not delete, is called from range-input.js
function updateFontSizeSlider() {
    slider_value = font_range.value;

    font_size_demo.style.fontSize = "";
    if(is_mobile) font_size = 3 + slider_value * 0.02 + "vw"
    else font_size = slider_value * 0.02 + "vw"; 
    font_size_demo.style.fontSize = font_size;
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

// function mobileFontSize() {
//     console.log("mobile");
//     if((window.innerWidth <= 800) && (window_prev_width > 800)){
//         is_mobile = true;
//     }
//     else if((window.innerWidth > 800) && (window_prev_width <= 800)){
//         is_mobile = false;
//     }
//     updateFontSize();
//     window_prev_width = window.innerWidth;
// }

// Entry point, get and initialize all settings
getSettings();

contrast_toggle.addEventListener("change", () => {
    if(contrast_toggle.checked) {
        test_contrast = true;
        updateContrast();
    }
    else {
        test_contrast = false;
        updateContrast();
    }
})

simple_toggle.addEventListener("change", () => {
    if(simple_toggle.checked) {
        simple_text = true;
        updateSimple();
    }
    else {
        simple_text = false;
        updateSimple();
    }
})

minus_btn.addEventListener("click", decreaseFontSize);
plus_btn.addEventListener("click", increaseFontSize);

save_btn.addEventListener("click", () => {
    setSettings();
})

reset_btn.addEventListener("click", () => {
    font_size = "1vw";
    simple_text = false;
    test_contrast = false;
    slider_value = 50;

    updateFontSize();
    updateContrastToggle();
    updateSimpleToggle();
    updateContrast();
    updateSimple();

    setSettings();
})