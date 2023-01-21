var test_text = document.getElementById("easy-text-demo");
var simple_toggle = document.getElementById("simple-text");
var test_simple = false;

var font_size = "1vw";
var simple_text = false;
var test_contrast = false;
var original_text = "";
var simplified_text = "";

function initSimple(accessibility) {
    font_size = accessibility.font_size;
    simple_text = accessibility.simple_text;
    test_contrast = accessibility.contrast;
    original_text = accessibility.original_text;
    simplified_text = accessibility.simplified_text;

    test_simple = simple_text;
    updateSimple();

}

function getSimple() {
    fetch("http://localhost:8085/accessibility",{
      method:"get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' }
    }).then(function(response){
      response.json().then(function(data){
        let accessibility = JSON.parse(data);
        initSimple(accessibility);
      });
    }); 
}

function setSimple() {
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

function updateSimple() {
    if(test_simple) test_text.textContent = simplified_text;
    else test_text.textContent = original_text;

    setSimple();
}

getSimple();

simple_toggle.addEventListener("change", () => {
    if(simple_toggle.checked) {
        test_simple = true;
        updateSimple();
    }
    else {
        test_simple = false;
        updateSimple();
    }
})