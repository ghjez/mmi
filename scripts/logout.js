function logout() {
    if(sessionStorage.getItem("loggedIn")){
        sessionStorage.removeItem("loggedIn");
    }
    window.location.href="./login.html";     
}