function log(a) {
  console.log(a);
}
var userError = document.getElementById("formError");
/* initiate a compare list */

for (let i = 0; i < list.length; i++) {
  for (let j = 0; j < list[i].answers.length; j++) {
    correctAnswers += list[i].answers[j].value;
  }
  compareList.push(correctAnswers);
  correctAnswers = 0;
}
log(compareList);


/* check user */

beginBtn.addEventListener("click", checkUser);

function checkUser() {
  
  var myRequest = new XMLHttpRequest();
  myRequest.open(
    "GET",
    "https://api.github.com/users/" + gitUser.value + "/repos"
  );
  
  myRequest.send();
  myRequest.addEventListener("error", function applyError(){
    userError.classList.add("internetError");
  })
 

  myRequest.addEventListener("load", function onLoad(e) {
    var myResponseAsText = e.target.response;
    var myStatus = e.target.status;
    var myResponseAsAJSON = JSON.parse(myResponseAsText);
    var repoNo = myResponseAsAJSON.length;

    if ((myStatus >= 200) & (myStatus < 400)) {
      firstPage.classList.add("hidden");
      congratsPage.classList.remove("hidden");
      repoCount.innerHTML = "Congrats! You have " + repoNo + " repos on Github.";
    } else {
      if (myStatus >= 400) {
        userError.classList.add("error");
      }
    }
  });
}

/* get first question */

nextQuizBtn.addEventListener("click", getQuiz);
function getQuiz() {
  savedResultsPage.classList.add("hidden");
  secondPage.classList.remove("hidden");
  myQuestion.innerHTML = "";
  inputForm.innerHTML = "";
  i = 0;
  userAnswers = [];
  generateQ(i);
}

letsGo.addEventListener("click", switchToQuiz);

function switchToQuiz() {
  congratsPage.classList.add("hidden");
  secondPage.classList.remove("hidden");
  generateQ(i);
}

/* generate the following questions, store answers */

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
    totalScore.innerHTML = "";
    totalScore.innerHTML +=
      " Congrats ! You have achieved a score of " + resultPercentage;
    score = 0;
  }
}



/* secondary functions */

function generateQ(i) {
  myQuestion.innerHTML = list[i].question;

  for (var j = 0; j < list[i].answers.length; j++)
    inputForm.innerHTML +=
    '<p>' + '<input class="checkBox" type = "checkbox">' + list[i].answers[j].text + '</p>'
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

// chart initialization

var ctx = document.getElementById("myChart");

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: [],
    datasets: [
      {
        label: "Previous results",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      }
    ]
  },

  // Configuration options go here
  options: {
    responsive: true
  }
});

var resultDate = [];
var resultScore = [];
saveResultBtn.addEventListener("click", goToChart);

/* local storage */

function goToChart() {

  lastPage.classList.add("hidden");
  savedResultsPage.classList.remove("hidden");

  var today = new Date();
  var result = resultPercentage.slice(0, -1);
  var scores = {
    name: gitUser.value,
    date: today.toDateString(),
    scoreNew: result
  }

  var scoresList = JSON.parse(localStorage.getItem('chartData'));

  if (!scoresList) {
    scoresList = [];
  }
  scoresList.push(scores);

  for (var i = 0; i < scoresList.length; i++) {
    if (scoresList[i].name == gitUser.value) {
      chart.data.labels.push(scoresList[i].date);
      chart.data.datasets[0].data.push(scoresList[i].scoreNew);
    }
  }
  localStorage.setItem('chartData', JSON.stringify(scoresList));

}

previousResultsBtn.addEventListener("click", showChart);
// display results chart
function showChart() {
  congratsPage.classList.add("hidden");
  savedResultsPage.classList.remove("hidden");

  var scoresList = JSON.parse(localStorage.getItem('chartData'));

  if (scoresList) {

    for (var i = 0; i < scoresList.length; i++) {
      chart.data.labels.push(scoresList[i].date);
      chart.data.datasets[0].data.push(scoresList[i].scoreNew);
    }
  }

}




