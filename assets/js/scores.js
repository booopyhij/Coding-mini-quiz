function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscoreslist')) || [];
  
    // sort highscores by score property in descending order HINT: the sort method. 
    
  
    for (var i = 0; i < highscores.length; i += 1) {
      // create li tag for each high score
      var liTag = document.createElement('li');
      liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
  
      // display on page
      var olEl = document.getElementById('highscoreslist');
      olEl.appendChild(liTag);
    }
  }
  
  function clearHighscores() {
    window.localStorage.removeItem('highscoreslist');
    window.location.reload();
  }
  
  document.getElementById('clear').onclick = clearHighscores;
  
  // run function when page loads
  printHighscores();
  