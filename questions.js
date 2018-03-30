
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
var totalScore = document.getElementById("finalScore");

var compareList = [];
var i = 0;
var score = 0;
var resultPercentage = 0;
var userAnswers = [];
var correctAnswers = 0;
var scoresList = [];

var list = [
  {
    question:
      'What is the correct JavaScript syntax to change the content of the HTML element below? <br> < p id="demo" >This is a demonstration.< /p >',
    answers: [
      { text: '#demo.innerHTML = "Hello World!"', value: 0 },
      { text: 'document.getElementById("demo").innerHTML = "Hello World!"', value: 1 },
      { text: 'document.getElementByName("p").innerHTML = "Hello World!"', value: 0 }
    ]
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "< javascript >", value: 0 },
      { text: "< script >", value: 1 },
      { text: "< js >", value: 0 }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Home Tool Markup Language", value: 0 },
      { text: "Hyper Text Markup Language", value: 1 },
      { text: "Hyperlinks and Text Markup Language", value: 0 }
    ]
  },
  {
    question: "Who is making the Web standards?",
    answers: [
      { text: "Google", value: 0 },
      { text: "The World Wide Web Consortium", value: 1 },
      { text: "Microsoft", value: 0 }
    ]
  },
  {
    question: "Choose the correct HTML element for the largest heading.",
    answers: [
      { text: "< head >", value: 0 },
      { text: "< h1 >", value: 1 },
      { text: "< h6 >", value: 0 }
    ]
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    answers: [
      { text: "< break >", value: 0 },
      { text: "< lb >", value: 0 },
      { text: "< br >", value: 1 }
    ]
  },
  {
    question:
      "Where in an HTML document is the correct place to refer to an external style sheet?",
    answers: [
      { text: "In the < head > section", value: 1 },
      { text: "In the < body > section", value: 0 },
      { text: "At the end of the document", value: 0 }
    ]
  },
  {
    question:
      'What is the correct syntax for referring to an external script called "abc.js"?',
    answers: [
      { text: '< script name="abc.js">', value: 0 },
      { text: '< script href="abc.js" >', value: 0 },
      { text: '< script src="abc.js" >', value: 1 }
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", value: 0 },
      { text: "function myFunction()", value: 1 },
      { text: "function:myFunction()", value: 0 }
    ]
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      { text: "if i = 5 then", value: 0 },
      { text: "if i == 5 then", value: 0 },
      { text: "if (i == 5)", value: 1 }
    ]
  },
  {
      question: "The external JavaScript file must contain the <script> tag.",
      answers: [
        { text: "True", value: 0 },
        { text: "False", value: 1 }
      ]
    },
    {
      question: 'How do you write "Hello World" in an alert box?',
      answers: [
        { text: 'alertBox("Hello World");', value: 0 },
        { text: 'msg("Hello World");', value: 0 },
        { text: 'alert("Hello World");', value: 1 },
        { text: 'msgBox("Hello World");', value: 0 }
      ]
    },
    {
      question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
      answers: [
        { text: "if i =! 5 then", value: 0 },
        { text: "if (i != 5)", value: 1 },
        { text: "if (i <> 5)", value: 0 },
        { text: "if (i <> 5)", value: 0}
      ]
    },
    {
      question: 'How does a WHILE loop start?',
      answers: [
        { text: "while i = 1 to 10", value: 0 },
        { text: "while (i <= 10)", value: 1 },
        { text: "while (i <= 10; i++)", value: 0 }
      ]
    },
    {
      question: 'How does a FOR loop start?',
      answers: [
        { text: "for (i <= 5; i++)", value: 0 },
        { text: "for (i = 0; i <= 5)", value: 0 },
        { text: "for i = 1 to 5", value: 0 },
        { text: "for (i = 0; i <= 5; i++)", value: 1}
      ]
    },
    {
      question: 'How can you add a comment in a JavaScript?',
      answers: [
        { text: "<!--This is a comment-->", value: 1 },
        { text: "'This is a comment", value: 0 },
        { text: " //This is a comment", value: 1 }
      ]
    },
    {
      question: 'How to insert a comment that has more than one line?',
      answers: [
        { text: '/*This comment has more than one line*/', value: 1 },
        { text: "/This comment has more than one line//", value: 1 },
        { text: " <!--This comment has more than one line-->", value: 1 }
      ]
    },
    {
      question: '',
      answers: [
        { text: "", value: 0 },
        { text: "", value: 1 },
        { text: "", value: 0 },
        { text: "", value: 0}
      ]
    },
    {
      question: 'What is the correct way to write a JavaScript array?',
      answers: [
        { text: 'var colors = "red", "green", "blue"', value: 0 },
        { text: 'var colors = ["red", "green", "blue"]', value: 1 },
        { text: 'var colors = (1:"red", 2:"green", 3:"blue")', value: 0 }
      ]
    },
    {
      question: 'How do you round the number 7.25, to the nearest integer?',
      answers: [
        { text: "Math.round(7.25)", value: 1 },
        { text: "round(7.25)", value: 0 },
        { text: "Math.rnd(7.25)", value: 0 }
      ]
    },
    {
      question: 'How do you find the number with the highest value of x and y?',
      answers: [
        { text: "Math.max(x, y)", value: 1 },
        { text: "top(x, y)", value: 0 },
        { text: "Math.ceil(x, y)", value: 0 }
      ]
    },
    {
      question: 'What is the correct JavaScript syntax for opening a new window called "w2" ?',
      answers: [
        { text: 'w2 = window.open("http://www.w3schools.com");', value: 1 },
        { text: 'w2 = window.new("http://www.w3schools.com");', value: 0 }
      ]
    },
    {
      question: 'JavaScript is the same as Java.',
      answers: [
        { text: "True", value: 0 },
        { text: "False", value: 1 }
      ]
    },
    {
      question: "How can you detect the client's browser name?",
      answers: [
        { text: "navigator.appName", value: 1 },
        { text: "client.navName", value: 0 },
        { text: "browser.name", value: 0 }
      ]
    },
    {
      question: 'Which event occurs when the user clicks on an HTML element?',
      answers: [
        { text: "onmouseover", value: 0 },
        { text: "onchange", value: 0 },
        { text: "onclick", value: 1 },
        { text: "onmouseclick", value: 0}
      ]
    },
    {
      question: 'How do you declare a JavaScript variable?',
      answers: [
        { text: "variable carName;", value: 0 },
        { text: "v carName;", value: 0 },
        { text: "var carName;", value: 1 }
      ]
    },
    {
      question: 'Which operator is used to assign a value to a variable?',
      answers: [
        { text: "-", value: 0 },
        { text: "*", value: 0},
        { text: "=", value: 1 },
        { text: "x", value: 0}
      ]
    },
    {
      question: 'What will the following code return: Boolean(10 > 9)',
      answers: [
        { text: "NaN", value: 0 },
        { text: "true", value: 1 },
        { text: "false", value: 0 }
      ]
    },
    {
      question: 'Is JavaScript case-sensitive?',
      answers: [
        { text: "Yes", value: 1 },
        { text: "No", value: 0 }
      ]
    },
    {
      question: 'What does XML stand for?',
      answers: [
        { text: "Example Markup Language", value: 0 },
        { text: "eXtensible Markup Language", value: 1 },
        { text: "X-Markup Language", value: 0 }
      ]
    },
    {
      question: 'There is a way of describing XML data, how?',
      answers: [
        { text: "XML uses a description node to describe data", value: 0 },
        { text: "XML uses a DTD to describe the data", value: 1 },
        { text: "XML uses XSL to describe data", value: 0 }
      ]
    },
    {
      question: 'What does DTD stand for?',
      answers: [
        { text: "Document Type Definition", value: 1 },
        { text: "Dynamic Type Definition", value: 0 },
        { text: "Direct Type Definition", value: 0 }
      ]
    },
    {
      question: 'What is the correct HTML for referring to an external style sheet?',
      answers: [
        { text: '<stylesheet> mystyle.css </stylesheet>', value: 0 },
        { text: '<link rel="stylesheet" type="text/css" href="mystyle.css">', value: 1 },
        { text: '<style src="mystyle.css">', value: 0 }
      ]
    },
    {
      question: 'Which HTML attribute is used to define inline styles?',
      answers: [
        { text: "class", value: 0 },
        { text: "styles", value: 0 },
        { text: "style", value: 1 }
      ]
    },
    {
      question: 'Which is the correct CSS syntax?',
      answers: [
        { text: "{body;color:black;}", value: 0 },
        { text: " body {color: black;}", value: 1 },
        { text: "{body:color=black;}", value: 0 }
      ]
    },
    {
      question: 'Which property is used to change the background color?',
      answers: [
        { text: "color", value: 0 },
        { text: "bgcolor", value: 0 },
        { text: "background-color", value: 1 }
      ]
    },
    {
      question: 'Which CSS property is used to change the text color of an element?',
      answers: [
        { text: "color", value: 1 },
        { text: "text-color", value: 0 },
        { text: "fgcolor", value: 0 }
      ]
    },
    {
      question: 'How do you add a background color for all <h1> elements?',
      answers: [
        { text: "h1.all {background-color:#FFFFFF;}", value: 0 },
        { text: "all.h1 {background-color:#FFFFFF;}", value: 0 },
        { text: "h1 {background-color:#FFFFFF;}", value: 1 }
      ]
    },
    {
      question: 'Which CSS property controls the text size?',
      answers: [
        { text: "font-style", value: 0 },
        { text: "font-size", value: 1 },
        { text: "text-size", value: 0 },
        { text: "text-style", value: 0 }
      ]
    },
    {
      question: 'What is the correct CSS syntax for making all the <p> elements bold?',
      answers: [
        { text: "p {font-weight:bold;}", value: 1 },
        { text: '<p style="text-size:bold;">', value: 0 },
        { text: "p {text-size:bold;}", value: 0 }
      ]
    },
    {
      question: 'How do you display hyperlinks without an underline?',
      answers: [
        { text: " a {underline:none;}", value: 0 },
        { text: "a {text-decoration:none;}", value: 1 },
        { text: "a {text-decoration:no-underline;}", value: 0 }
      ]
    },
    {
      question: 'How do you make each word in a text start with a capital letter?',
      answers: [
        { text: "text-transform:capitalize", value: 1 },
        { text: "text-transform:uppercase", value: 0 },
        { text: "You can't do that with CSS", value: 0 }
      ]
   }
];
