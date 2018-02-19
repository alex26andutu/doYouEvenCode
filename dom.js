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
var myQuestion = document.getElementById('question');
var answerOne = document.getElementById("R1");
var answerTwo = document.getElementById("R2");
var answerThree = document.getElementById("R3");


beginBtn.addEventListener("click", change);

letsGo.addEventListener("click", swich);
function swich(){
    congratsPage.classList.add("hidden");
    secondPage.classList.remove("hidden");
  
}

function change()
{
     firstPage.classList.add("hidden");
    congratsPage.classList.remove("hidden");
    
}


beginBtn.addEventListener('click', checkUser);

function checkUser (){
    var myRequest = new XMLHttpRequest;
    myRequest.open("GET", "https://api.github.com/users/" + gitUser.value + "/repos");
    myRequest.send();

    // myRequest.addEventListener("error", function onError(e){
    //     userError.classList.add("error");})

    myRequest.addEventListener("load", function onLoad(e) {
        // footerSpinner.classList.add("hidden");
        var myResponseAsText = e.srcElement.response;
        var myResponseAsAJSON = JSON.parse(myResponseAsText);
        var x= myResponseAsAJSON.length;
        repoCount.innerHTML= "Congrats! You have " + x + " repos on Github."
      });

         
}
var list = [a1={ question: "What is CSS (Cascading Style Sheets) and what is its role in web designing ?", answer1: "CSS is a set of rules" , answer2: "CSS is a language ", answer3:"CSS refers to a stylesheet"}]
// a2={ question: "What (Math.random() * 10) + 1 returns ?", answer1: "Returns a random number between 0 (inclusive) and 1 (exclusive)", answer2: "Returns a number, representing a number from 0 up to but not including 1", answer3: "Returns a random number between 1 and 10"},
 

    myQuestion.innerHTML = list[0].question; // generate a random question from 1 to 10
    answerOne.innerHTML = list[0].answer1;
    answerTwo.innerHTML = list[0].answer2;
    answerThree.innerHTML = list[0].answer3;

