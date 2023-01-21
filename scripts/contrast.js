var test_image = document.getElementById("test_image");
var contrast_toggle = document.getElementById("contrast");
var font_size = "1vw";
var simple_text = false;
var test_contrast = false;
var original_text = "";
var simplified_text = "";

function initContrast(accessibility) {
    font_size = accessibility.font_size;
    simple_text = accessibility.simple_text;
    test_contrast = accessibility.contrast;
    original_text = accessibility.original_text;
    simplified_text = accessibility.simplified_text;
}

function getContrast() {
    fetch("http://localhost:8085/accessibility",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let accessibility = JSON.parse(data);
        initContrast(accessibility);
      });
    }); 
}
  
function setContrast() {
    fetch("http://localhost:8085/accessibility",{
        method:"put",
        body: JSON.stringify({
        font_size: font_size,
        simple_text: simple_text,
        contrast: test_contrast,
        original_text: original_text,
        simplified_text: simplified_text
    }),
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
    });
}

function updateContrast() {
    if(test_contrast) test_image.style.filter = "contrast(200%)";
    else test_image.style.filter = "contrast(100%)";

    setContrast()
}

getContrast();

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