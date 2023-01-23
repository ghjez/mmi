const header = document.getElementsByTagName('header')[0];
console.log(header);
var window_prev_width = window.innerWidth; 

desktopMenu = `<button onclick= "window.location.href='index.html'" role="" id="module-btn" class="menu-btn"><label for="module" class="menu-btn-label">Module</label><span class="material-icons">menu_book</span></button>
<button onclick= "window.location.href='pruefungen.html'" role="" id="pruefungen-btn" class="menu-btn"><label for="pruefungen" class="menu-btn-label">Prüfungen</label><span class="material-symbols-outlined">fact_check</span></button>
<button onclick= "window.location.href='profil.html'" role="" id="profil-btn" class="menu-btn"><label for="profil" class="menu-btn-label">Profil</label><span class="material-symbols-outlined">person</span></button>
<button onclick= "window.location.href='accessibility.html'" role="" id="barrierfrei-btn" class="menu-btn"><label for="barrierfrei" class="menu-btn-label">Barrierefrei</label><span class="material-icons">accessibility_new</span></button>
<button onclick="logout();" role="" id="logout-btn" class="menu-btn"><label for="logout" class="menu-btn-label">Log Out</label><span class="material-icons">exit_to_app</span></button>`

mobileMenu = `
<!-- "Hamburger menu" / "Bar icon" to toggle the navigation links -->
<a href="javascript:void(0);" class="icon" onclick="toggleMenu()">
<i class="fa fa-bars"></i>
</a>
<div id="mobile-menu">
<a href="index.html">Module<span class="material-icons">menu_book</span></a>
<a href="pruefungen.html">Prüfungen<span class="material-symbols-outlined">fact_check</span></a>
<a href="profil.html">Profil<span class="material-symbols-outlined">person</span></a>
<a href="accessibility.html">Barrierfrei<span class="material-icons">accessibility_new</span></a>
<a onclick="logout();">Logout<span class="material-icons">exit_to_app</span></a>
</div>
`

function toggleMenu() {
    var x = document.getElementById("mobile-menu");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
    }
}

function loadMenu(){
    if(window.innerWidth <= 800){
        header.innerHTML = '';
        header.innerHTML = mobileMenu;
    }
    else if(window.innerWidth > 800){
        header.innerHTML = '';
        header.innerHTML = desktopMenu;
    }
    
    window_prev_width = window.innerWidth;
}

function reloadMenu(){
    if((window.innerWidth <= 800) && (window_prev_width > 800)){
        header.innerHTML = '';
        header.innerHTML = mobileMenu;
    }
    else if((window.innerWidth > 800) && (window_prev_width <= 800)){
        header.innerHTML = '';
        header.innerHTML = desktopMenu;
    }
    
    window_prev_width = window.innerWidth;
}

function resized() {
    reloadMenu();
    if(typeof reloadmk2 === "function") reloadmk2();
    // if(typeof mobileFontSize === "function") mobileFontSize();
}

loadMenu();

window.onresize = resized;