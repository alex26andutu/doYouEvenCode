function log(a) {
    console.log(a);
}

var beginBtn = document.getElementById("beginBtn");
var firstPage = document.getElementById("frontPage");
var secondPage = document.getElementById("quizPage");
var gitUser = document.getElementById("userName");
var congratsPage = document.getElementById("idAndRepo");
var repoCount = document.getElementById("repoNr");
var letsGo = document.getElementById("nextButton");
var userError = document.getElementById("formError");
var myQuestion = document.getElementById("question");
var progressPage = document.getElementById("myProgress");




beginBtn.addEventListener("click", move);

function move() {
    firstPage.classList.add("hidden");
    progressPage.classList.remove("hidden");
    var elem = document.getElementById("myBar"); 

    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {

            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
            elem.innerHTML = width * 1 + '%';
        }
    }

    setTimeout(function (){
        progressPage.classList.add("hidden");
        congratsPage.classList.remove("hidden");
    },1500);
    
}

// beginBtn.addEventListener("click", change);

// function change(){
//     firstPage.classList.add("hidden");
//     congratsPage.classList.remove("hidden");
// }

letsGo.addEventListener("click", swich);

function swich(){
    congratsPage.classList.add("hidden");
    secondPage.classList.remove("hidden");
}

beginBtn.addEventListener('click', checkUser);

function checkUser (){
    var myRequest = new XMLHttpRequest;
    myRequest.open("GET", "https://api.github.com/users/" + gitUser.value + "/repos");
    myRequest.send();


    myRequest.addEventListener("load", function onLoad(e) {     
        var myResponseAsText = e.srcElement.response;
        var myResponseAsAJSON = JSON.parse(myResponseAsText);
        var x= myResponseAsAJSON.length;
        repoCount.innerHTML= "Congrats! You have " + x + " repos on Github."
      });         
}

