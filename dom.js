function log(a) {
    console.log(a);
}

var beginBtn = document.getElementById("beginBtn");
var firstPage = document.getElementById("frontPage");
var secondPage = document.getElementById("quizPage")
var gitUser = document.getElementById("userName");
var congratsPage = document.getElementById("idAndRepo")
var repoCount = document.getElementById("repoNr")
var letsGo = document.getElementById("nextButton")



beginBtn.addEventListener("click", change);

letsGo.addEventListener("click", swich)
function swich(){
    congratsPage.classList.add("hidden")
    secondPage.classList.remove("hidden")
  
}

function change()
{
    firstPage.classList.add("hidden")
    congratsPage.classList.remove("hidden")
    
}

  beginBtn.addEventListener('click', checkUser);


function checkUser (){
    var myRequest = new XMLHttpRequest;
    myRequest.open("GET", "https://api.github.com/users/" + gitUser.value + "/repos");
    myRequest.send();

    myRequest.addEventListener("load", function onLoad(e) {
        // footerSpinner.classList.add("hidden");
        var myResponseAsText = e.srcElement.response;
        var myResponseAsAJSON = JSON.parse(myResponseAsText);
        var x= myResponseAsAJSON.length;
        repoCount.innerHTML= "Congrats! You have " + x + " repos on Github."
      });
}

