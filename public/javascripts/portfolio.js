var trigram = "/icons/trigram.png";
var cross = "/icons/cross.png";

var nav = document.getElementsByTagName('nav')[0];
var topnav = document.getElementById('mytopnav');
var respIcon = document.getElementsByClassName('resp-icon')[0];
var respImg = document.getElementsByClassName('resp-img')[0];

window.onload = function () {
    
    respIcon.addEventListener('click', function () {
       
        if (topnav.style.display === "none") {
            respImg.src = cross;
            topnav.style.display = "block";
        } else {
            respImg.src = trigram;
            topnav.style.display = "none";
        }
    });
    
    
};
