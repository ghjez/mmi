var searchbox = document.getElementsByClassName("searchbox")[0];
var search_btn = document.getElementsByClassName("execute-search")[0];

console.log(searchbox);
console.log(search_btn);

search_btn.addEventListener("click", () => {
    if(searchbox.value == ("Informatik"||"informatik"||"info"||"Info")) window.location.href="modul_search.html";
    else alert("Suchen Sie nach 'Informatik'");
})