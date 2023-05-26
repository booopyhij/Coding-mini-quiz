// variables to keep track of quiz state
var currentQuestionIndex = 0;
//time left value here
var time = 40;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

//starting the quiz
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
// getting the first question upon start
  getQuestion();
}

// function to access and pull the questions
function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title; 
  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length ; i++) {
    // create new button for each choice with for loop
    var choice = currentQuestion.choices[i];
    var choiceButton = document.createElement('button');
    choiceButton.setAttribute('class', 'choice');
    choiceButton.setAttribute('value', choice);
    choiceButton.textContent = i + 1 + '. ' + choice;
    choiceButton.addEventListener('click', questionClick);
    // display on the page
    choicesEl.appendChild(choiceButton);
  }
}

// function that allows navigation through the questions
function questionClick(event) {
  var answerValue = event.target.value;
 console.log(event);
  // if the clicked element is not a choice button, do nothing.
  if (answerValue === questions[currentQuestionIndex].answer) {
    alert('correct');
  }
  
  // if user guessed wrong; time is penalized
  if (answerValue !== questions[currentQuestionIndex].answer) {
    time--;
    timerEl.textContent = time
    alert('incorrect');
  }
   
  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions or if time ran out
  if (currentQuestionIndex === questions.length || time <= 0) {
    quizEnd();
    return;

  } else {
    getQuestion();
    // if time didn't run out and there are still more questions
  }
}

// ending the quiz
function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  // hide questions section
  document.getElementById('questions').hidden = true 
}

function clockTick() {
  // decrement the variable we are using to track time
  time--;
  timerEl.textContent = time; 
// preventing the timer from going negative
  if (time === 1) {
    setTimeout(timerEl);
  }

  // if time runs out the quiz ends
  if (time <= 0) {
    quizEnd();
  }
}

// logging the score and initials of the quiz and logging them to local storage
function saveHighscore() {
  // get value of input box
 
  var initials = initialsEl.value.trim();
 console.log(initials);
  // make sure value wasn't empty
  if (initials.length < 1) {
    initials = 'initials';
    };
   
    // get saved scores from localstorage, or if not any, set to empty array
    //var highscores = [time, initials];
    var highscores =
      JSON.parse(localStorage.getItem("highscoreslist"))  || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };
    // save to localstorage 
    highscores.push(newScore);
    console.log(highscores);
    window.localStorage.setItem('highscoreslist', JSON.stringify(highscores));

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

initialsEl.onkeyup = checkForEnter;