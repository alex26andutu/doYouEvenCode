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
var inputForm = document.getElementById("inputEditor");
var NextQuestion = document.getElementById("BtnStart");
var lastPage = document.getElementById("resultPage");

var list = [
  {
    questions:
      'What is the correct JavaScript syntax to change the content of the HTML element below? <br> < p id="demo" >This is a demonstration.< /p >',
    answers: [
      {
        text: 'document.getElementByName("p").innerHTML = "Hello World!"',
        value: 0
      },
      { text: '#demo.innerHTML = "Hello World!"', value: 0 },
      {
        text: 'document.getElementById("demo").innerHTML = "Hello World!"',
        value: 1
      }
    ]
  },
  {
    questions: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "< javascript >", value: 0 },
      { text: "< script >", value: 1 },
      { text: "< js >", value: 0 }
    ]
  },
  {
    questions: "What does HTML stand for?",
    answers: [
      { text: "Home Tool Markup Language", value: 0 },
      { text: "Hyper Text Markup Language", value: 1 },
      { text: "Hyperlinks and Text Markup Language", value: 0 }
    ]
  },
  {
    questions: "Who is making the Web standards?",
    answers: [
      { text: "Google", value: 0 },
      { text: "The World Wide Web Consortium", value: 1 },
      { text: "Microsoft", value: 0 }
    ]
  },
  {
    questions: "Choose the correct HTML element for the largest heading.",
    answers: [
      { text: "< head >", value: 0 },
      { text: "< h1 >", value: 1 },
      { text: "< h6 >", value: 0 }
    ]
  },
  {
    questions: "What is the correct HTML element for inserting a line break?",
    answers: [
      { text: "< break >", value: 0 },
      { text: "< lb >", value: 0 },
      { text: "< br >", value: 1 }
    ]
  },
  {
    questions:
      "Where in an HTML document is the correct place to refer to an external style sheet?",
    answers: [
      { text: "In the < head > section", value: 1 },
      { text: "In the < body > section", value: 0 },
      { text: "At the end of the document", value: 0 }
    ]
  },
  {
    questions:
      'What is the correct syntax for referring to an external script called "abc.js"?',
    answers: [
      { text: '< script name="abc.js">', value: 0 },
      { text: '< script href="abc.js" >', value: 0 },
      { text: '< script src="abc.js" >', value: 1 }
    ]
  },
  {
    questions: "How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", value: 0 },
      { text: "function myFunction()", value: 1 },
      { text: "function:myFunction()", value: 0 }
    ]
  },
  {
    questions: "How to write an IF statement in JavaScript?",
    answers: [
      { text: "if i = 5 then", value: 0 },
      { text: "if i == 5 then", value: 0 },
      { text: "if (i == 5)", value: 1 }
    ]
  }
];

var corectAnswers = 0;
var compareList = [];
for (var i = 0; i < list.length; i++) {
  for (var j = 0; j < list[i].answers.length; j++) {
    corectAnswers += list[i].answers[j].value;
  }
  compareList.push(corectAnswers);
  corectAnswers = 0;
}

var userAnswers = [];

beginBtn.addEventListener("click", checkUser);

function checkUser() {
  var myRequest = new XMLHttpRequest();
  myRequest.open(
    "GET",
    "https://api.github.com/users/" + gitUser.value + "/repos"
  );
  myRequest.send();

  myRequest.addEventListener("load", function onLoad(e) {
    var myResponseAsText = e.srcElement.response;
    var a = e.srcElement.status;
    var myResponseAsAJSON = JSON.parse(myResponseAsText);
    var x = myResponseAsAJSON.length;
    //log(a)
    if ((a >= 200) & (a < 400)) {
      firstPage.classList.add("hidden");
      congratsPage.classList.remove("hidden");
      repoCount.innerHTML = "Congrats! You have " + x + " repos on Github.";
    } else {
      if (a >= 400) {
        userError.classList.add("error");
      }
    }
  });
}

var i = 0;
var answersList = [];

letsGo.addEventListener("click", switchToQuiz);

function switchToQuiz() {
  congratsPage.classList.add("hidden");
  secondPage.classList.remove("hidden");
  generateQ(i);
}

NextQuestion.addEventListener("click", generateQuiz);
var score = 0;
function generateQuiz() {
  storeAnswers(i);
  // if (userAnswers[i].length == 0) {
  //   generateQ(i);
  // } else
   i++;
  if (i < list.length) {
    myQuestion.innerHTML = "";
    inputForm.innerHTML = "";
    generateQ(i);

  } else {
    secondPage.classList.add("hidden");
    lastPage.classList.remove("hidden");
    for (var a = 0; a < userAnswers.length; a++)
      for (var b = 0; b < userAnswers[a].length; b++) {
        if (list[a].answers[userAnswers[b]].value == 0) break;
        else if (
          (list[a].answers[userAnswers[a][b]].value == 1 &&
            b < userAnswers[a].length - 1 &&
            list[a].answers[userAnswers[a][b + 1]].value == 0) ||
          (list[a].answers[userAnswers[a][b]].value == 1 &&
            b < userAnswers[a].length - 2 &&
            list[a].answers[userAnswers[a][b + 2]].value == 0)
        ) {
          break;
        } else {
          if (userAnswers[a].length == compareList[a]) score += 1;
          break;
        }
      }
    log(score);
  }
}

function generateQ(i) {
  myQuestion.innerHTML = list[i].questions;

  for (var j = 0; j < list[i].answers.length; j++)
    inputForm.innerHTML +=
      '<input class="checkBox" type = "checkbox" >' + list[i].answers[j].text;
}

function storeAnswers(i) {
  var inputList = document.getElementsByClassName("checkBox");
  userAnswers.push([]);
  for (var a = 0; a < inputList.length; a++)
    if (inputList[a].checked == true) userAnswers[i].push(a)
   
  log(userAnswers);
}