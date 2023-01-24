var menu_btns = document.getElementsByClassName('menu-btn');
var login_btn = document.getElementById('logout-btn');
var save_btn = document.getElementById("save");
var reset_btn = document.getElementById("reset");

var login_label = login_btn.firstChild;
console.log(menu_btns);

if (!sessionStorage.getItem("loggedIn")) {
  // Redirect the user to the login page
  if(barriere == true) {
    for(let i = 0; i < menu_btns.length; i++){
      console.log(menu_btns[i]);
      menu_btns[i].style.display = "none";
    }
    login_btn.style.display = "flex";
    login_label.textContent = "Log In";
    save_btn.style.display = "flex";
    reset_btn.style.display = "flex";
  }
  else {
    window.location.href = "./login.html";
  }
}