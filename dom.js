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
var knowledgePercentage = document.getElementById("Klvl");
var saveResultBtn = document.getElementById("saveResult");
var previousResultsBtn = document.getElementById("previousResults");
var savedResultsPage = document.getElementById("savedResults");
var nextQuizBtn = document.getElementById("getNext");

var list = [
  {
    question:
      '1. What is the correct JavaScript syntax to change the content of the HTML element below? <br> < p id="demo" >This is a demonstration.< /p >',
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
    question: "2. Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "< javascript >", value: 0 },
      { text: "< script >", value: 1 },
      { text: "< js >", value: 0 }
    ]
  },
  {
    question: "3. What does HTML stand for?",
    answers: [
      { text: "Home Tool Markup Language", value: 0 },
      { text: "Hyper Text Markup Language", value: 1 },
      { text: "Hyperlinks and Text Markup Language", value: 0 }
    ]
  },
  {
    question: "4. Who is making the Web standards?",
    answers: [
      { text: "Google", value: 0 },
      { text: "The World Wide Web Consortium", value: 1 },
      { text: "Microsoft", value: 0 }
    ]
  },
  {
    question: "5. Choose the correct HTML element for the largest heading.",
    answers: [
      { text: "< head >", value: 0 },
      { text: "< h1 >", value: 1 },
      { text: "< h6 >", value: 0 }
    ]
  },
  {
    question: "6. What is the correct HTML element for inserting a line break?",
    answers: [
      { text: "< break >", value: 0 },
      { text: "< lb >", value: 0 },
      { text: "< br >", value: 1 }
    ]
  },
  {
    question:
      "7. Where in an HTML document is the correct place to refer to an external style sheet?",
    answers: [
      { text: "In the < head > section", value: 1 },
      { text: "In the < body > section", value: 0 },
      { text: "At the end of the document", value: 1 }
    ]
  },
  {
    question:
      '8. What is the correct syntax for referring to an external script called "abc.js"?',
    answers: [
      { text: '< script name="abc.js">', value: 0 },
      { text: '< script href="abc.js" >', value: 0 },
      { text: '< script src="abc.js" >', value: 1 }
    ]
  },
  {
    question: "9. How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", value: 0 },
      { text: "function myFunction()", value: 1 },
      { text: "function:myFunction()", value: 0 }
    ]
  },
  {
    question: "10. How to write an IF statement in JavaScript?",
    answers: [
      { text: "if i = 5 then", value: 0 },
      { text: "if i == 5 then", value: 0 },
      { text: "if (i == 5)", value: 1 }
    ]
  }
];

var compareList = [];
var i = 0;
var score = 0;
var resultPercentage = 0;
var userAnswers = [];
var correctAnswers = 0;

for (var c = 0; c < list.length; c++) {
  for (var d = 0; d < list[c].answers.length; d++) {
    correctAnswers += list[c].answers[d].value;
  }
  compareList.push(correctAnswers);
  correctAnswers = 0;
}
log(compareList);

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

// previousResultsBtn.addEventListener('click', change)

// function change (){
//   congratsPage.classList.add('hidden');
//   savedResultsPage.classList.remove('hidden');
// }

nextQuizBtn.addEventListener("click", getQuiz);
function getQuiz() {
  savedResultsPage.classList.add("hidden");
  secondPage.classList.remove("hidden");
  generateQ(i);
}

letsGo.addEventListener("click", switchToQuiz);

function switchToQuiz() {
  congratsPage.classList.add("hidden");
  secondPage.classList.remove("hidden");
  generateQ(i);
}

NextQuestion.addEventListener("click", generateQuiz);

function generateQuiz() {
  storeAnswers(i);
  if (userAnswers[i].length == 0) {
    return;
  } else i++;
  if (i < list.length) {
    myQuestion.innerHTML = "";
    inputForm.innerHTML = "";
    generateQ(i);
  } else {
    secondPage.classList.add("hidden");
    lastPage.classList.remove("hidden");

    for (var a = 0; a < userAnswers.length; a++)
      for (var b = 0; b < userAnswers[a].length; b++) {
        // debugger
        if (list[a].answers[userAnswers[a][b]].value == 0) {
          break;
        } else if (
          (list[a].answers[userAnswers[a][b]].value == 1 &&
            b < userAnswers[a].length - 1 &&
            list[a].answers[userAnswers[a][b + 1]].value == 0) ||
          (list[a].answers[userAnswers[a][b]].value == 1 &&
            b < userAnswers[a].length - 2 &&
            list[a].answers[userAnswers[a][b + 2]].value == 0)
        ) {
          break;
        } else {
          if (userAnswers[a].length == compareList[a]) {
            log(userAnswers[a].length);
            log(compareList[a]);
            score += 1;
            break;
          }
        }
      }
    log(score);

    resultPercentage = Math.round(score / compareList.length * 100)
      .toString()
      .concat("%");
    log(resultPercentage);

    lastPage.innerHTML +=
      '<div id="finalScore"> Congrats ! You have achieved a score of </div>' +
      resultPercentage;
  }
}



function generateQ(i) {
  myQuestion.innerHTML = list[i].question;

  for (var j = 0; j < list[i].answers.length; j++)
    inputForm.innerHTML +=
      '<input class="checkBox" type = "checkbox">' + list[i].answers[j].text;
}

function storeAnswers(n) {
  var inputList = document.getElementsByClassName("checkBox");
  userAnswers.push([]);

  for (var p = 0; p < inputList.length; p++)
    if (inputList[p].checked == true) {
      userAnswers[n].push(p);
    }
  log(userAnswers);
}

var ctx = document.getElementById("myChart");

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Previous results",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45]
      }
    ]
  },

  // Configuration options go here
  options: {
    responsive: true
  }
});

previousResultsBtn.addEventListener("click", showChart);

function showChart() {
  congratsPage.classList.add("hidden");
  savedResultsPage.classList.remove("hidden");
}


saveResultBtn.addEventListener("click", goToChart);

function goToChart() {
  lastPage.classList.add("hidden");
  savedResultsPage.classList.remove("hidden");
  var today = new Date();
  var resultDate = [];
  resultDate.push(today.toDateString());

  var resultScore = [];
  resultScore.push(resultPercentage);
  lastPage.classList.add("hidden");
  savedResultsPage.classList.remove("hidden");
}



// var resultList = [];
// var savedResult = localStorage.getItem('finalScore');
// resultList.push(result);