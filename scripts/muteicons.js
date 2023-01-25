function remute() {
    var icons = document.getElementsByClassName("material-icons");
    var icons_outlined = document.getElementsByClassName("material-symbols-outlined");

    for(let i = 0; i < icons.length; i++) icons[i].ariaHidden = true;
    for(let i = 0; i < icons_outlined.length; i++) icons_outlined[i].ariaHidden = true;
}

remute();