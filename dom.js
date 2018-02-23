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
var inputForm = document.getElementById("inputEditor");
var NextQuestion = document.getElementById('BtnStart');
var lastPage = document.getElementById('resultPage');


var questions = ['What is the correct JavaScript syntax to change the content of the HTML element below? <br> < p id="demo" >This is a demonstration.< /p >',
'Inside which HTML element do we put the JavaScript?',
'What does HTML stand for?','Who is making the Web standards?',
'Choose the correct HTML element for the largest heading.',
'What is the correct HTML element for inserting a line break?',
'Where in an HTML document is the correct place to refer to an external style sheet?',
'What is the correct syntax for referring to an external script called "abc.js"?', 
'How do you create a function in JavaScript?',
'How to write an IF statement in JavaScript?' ];

var answers =[  
[{text:'document.getElementByName("p").innerHTML = "Hello World!"', value: 0},{text:'#demo.innerHTML = "Hello World!"', value: 0},{text:'document.getElementById("demo").innerHTML = "Hello World!"', value: 1}],
[{text:"< javascript >", value: 1}, {text:"< script >", value: 0}, {text:"< js >", value: 0}],
[{text:'Home Tool Markup Language', value: 0},{text:'Hyper Text Markup Language', value: 1},{text:'Hyperlinks and Text Markup Language', value: 0}],
[{text:'Google', value:0},{text:'The World Wide Web Consortium', value: 1},{text:'Microsoft', value: 0}],
[{text:'< head >', value:0},{text:'<h1>', value: 1},{text:'<h6>', value: 0}],
[{text:'< break >', value:0}, {text:'<lb>', value: 0},{text:'<br>', value: 1}],
[{text:'In the <head> section', value:1},{text:'In the <body> section', value: 0},{text:'At the end of the document', value: 1}],
[{text:'< script name="abc.js">', value:0},{text:'<script href="abc.js">', value: 0},{text:'<script src="abc.js">', value: 1}],
[{text:'function = myFunction()', value:0},{text:'function myFunction()', value: 1},{text:'function:myFunction()', value: 0}],
[{text:'if i = 5 then', value:0},{text:'if i == 5 then', value: 0},{text:'if (i == 5)', value: 1}]  ];



log(answers[7][2].text)
log(questions[7])
log(inputForm)


beginBtn.addEventListener('click', checkUser);

function checkUser() {
  var myRequest = new XMLHttpRequest;
  myRequest.open("GET", "https://api.github.com/users/" + gitUser.value + "/repos");
  myRequest.send();

  myRequest.addEventListener("load", function onLoad(e) {
    var myResponseAsText = e.srcElement.response;
    var a = e.srcElement.status;
    var myResponseAsAJSON = JSON.parse(myResponseAsText);
    var x = myResponseAsAJSON.length;
    //log(a)
    if (a >= 200 & a < 400) {
      firstPage.classList.add("hidden");
      congratsPage.classList.remove("hidden");
      repoCount.innerHTML = "Congrats! You have " + x + " repos on Github."
    }
    else {
      if (a >= 400) { userError.classList.add("error") }
    }
      
  })
}

var i=1;

letsGo.addEventListener("click", switchToQuiz);
function switchToQuiz(){
    congratsPage.classList.add("hidden");
    secondPage.classList.remove("hidden"); 
    myQuestion.innerHTML= questions[0];
    generateAnswer(0);
}


NextQuestion.addEventListener('click',generateQuiz);
function generateQuiz (){
  if(i< answers.length){
  myQuestion.innerHTML="";
  inputForm.innerHTML =""; 
  myQuestion.innerHTML= questions[i];
  generateAnswer(i);
  i++;}
  else {
    secondPage.classList.add("hidden");
    lastPage.classList.remove("hidden"); 
  }
}



function generateAnswer(i){
  for( j=0; j < answers[i].length; j++) {
    inputForm.innerHTML += '<input type = "checkbox">' + answers[i][j].text;
  }
}
   
   
//     // inputForm.innerHTML= + answers[0][0].text + '"<br>';



    
    
// }









// function getInput(x){
//     for(j=0,j<answers[x].length,j++)
//         inputForm.innerHTML = +"<input id="checkBox" type="checkbox">"+ answers[x][j].text + "><br>";

// }

// function getInput(i){
//   var newInput = document.createElement('input');
//   for(var j=0, j < answers[i].length, j++ )
//    newInput.innerHTML= + '<input type="checkbox"' + answers[i][j];
    
// }

// log(getInput(1));