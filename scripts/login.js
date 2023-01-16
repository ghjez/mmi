function checkLogin(){
    loginBox=document.getElementById("login-input");
    passwordBox=document.getElementById("password-input");
    if(loginBox.value==="admin" && passwordBox.value==="admin"){
        sessionStorage.setItem("loggedIn",true);
        window.location.href="./index.html";
    }
}