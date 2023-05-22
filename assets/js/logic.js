// variables to keep track of quiz state
var currentQuestionIndex = 0;
//time left value here
var time = 100;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');

  // un-hide questions section
  questionsEl.removeAttribute('class');

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;
 // startBtn.addEventListener("click")

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title; //think dot notation

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length ; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceButton = document.createElement('button');
    choiceButton.setAttribute('class', 'choice');
    choiceButton.setAttribute('value', choice);
 //   var button = document.createElement('button');
  //  button.innerHTML = document.getElementsByTagName('body')[i];
  //  body.appendChild(button);
  //  button.addEventListener("click", function() {
   //     alert('did something')
   // });
   // console.log(button);
   

    choiceButton.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceButton);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches('.choice')) {
    return;
  }

  // check if user guessed wrong
    // penalize time
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time--;
    timerEl.textContent = time
    return;
  }
   
    // display new time on page
    
  // flash right/wrong feedback on page for half a second
 
  // move to next question
  currentQuestionIndex++;
 // //var button = document.createElement("button");
 // button.innerHTML = 'Next question';
 // var body = document.getElementsByTagName('body')[0];
 // body.appendChild(button);
  //document.getElementById("button").addEventListener("click",clickNext);

  // check if we've run out of questions or if time ran out?
  if (currentQuestionIndex = 0, timerId=0) {
    quizEnd();
    return;
    //if it did ???

  } else {
    getQuestion();
    // if it didnt??
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById('');
  endScreenEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('');
  finalScoreEl.textContent = time;

  // hide questions section
  document.getElementById('questions').hidden = true 
}

function clockTick() {
  // update time
  // decrement the variable we are using to track time
  time--;
  timerEl.textContent = time; // update out time

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials.length > 0) {
    var initials = localStorage.setItem('initials');
    }

    // get saved scores from localstorage, or if not any, set to empty array
    var initials = localStorage.getItem('initials');
    var highscores =
      JSON.parse(localStorage.getItem('initials')) /* what would go inside the PARSE??*/ || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(initials));

    // redirect to next page
    window.location.href = '';
  }
   

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;