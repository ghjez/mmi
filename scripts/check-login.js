if (!sessionStorage.getItem("loggedIn")) {
    // Redirect the user to the login page
    window.location.href = "./login.html";
  }