let menuContainer = document.getElementById('menu-container');
let trainingContainer = document.getElementById('training-container');
let trainingEndMenu = document.getElementById('training-end-menu');
let endScore = document.getElementById('score-text');
let onePlayerContainer = document.getElementById('one-player-container');
let twoPlayersContainer = document.getElementById('two-players-container');
let usernameInput = document.getElementById('username');
let leaderboard = document.getElementById("leaderboard");
let username = '';
let isLeaderboardActive = false;
var playersLeaderboard = JSON.parse(localStorage.getItem('PlayersLeaderboard')) || {};
var id = Object.keys(playersLeaderboard).pop() || 0;

function showMainMenu(){
  menuContainer.style.display = 'flex';
  trainingContainer.style.display = 'none';
  trainingEndMenu.style.display = 'none';
  onePlayerContainer.style.display = 'none';
  twoPlayersContainer.style.display = 'none';
}

function startGame(mode) {
  menuContainer.style.display = 'none';
  leaderboard.style.display = 'none';
  if(mode == 'training'){
    setupTraining();
    username = usernameInput.value || 'Гость';
  }
  else if(mode == 'one-player'){
    onePlayerContainer.style.display = 'block';
  }
  else if(mode == 'two-players'){
    twoPlayersContainer.style.display = 'block';
  }
}

function endTraining(score){
  playersLeaderboard = JSON.parse(localStorage.getItem('PlayersLeaderboard')) || {};
  trainingEndMenu.style.display = 'block';
  endScore.innerText = "Ваш счет: " + score;
  id++;
  playersLeaderboard[id] = {username:username, score: score};
  localStorage.setItem('PlayersLeaderboard', JSON.stringify(playersLeaderboard));
}

function getLeaderboard(){
  // playersLeaderboard = JSON.parse(localStorage.getItem('PlayersLeaderboard'));
  var leaderboardBody = document.getElementById("leaderboard-table").getElementsByTagName("tbody")[0];

  var sortedPlayerScores = Object.entries(playersLeaderboard).sort((a, b) => b[1].score - a[1].score);

  sortedPlayerScores.forEach(function([gameId, data], index) {
    var row = document.createElement('tr');
    var rankCell = document.createElement('td');
    var playerNameCell = document.createElement('td');
    var scoreCell = document.createElement('td');

    rankCell.textContent = index + 1;
    playerNameCell.textContent = data.username;
    scoreCell.textContent = data.score;

    row.appendChild(rankCell);
    row.appendChild(playerNameCell);
    row.appendChild(scoreCell);

    // Проверяем, является ли текущий айдишник последним в playerScores
    if (gameId === id) {
        row.style.fontWeight = 'bold';
    }

    leaderboardBody.appendChild(row);
});
}

function showLeaderboard(){
  getLeaderboard();
  leaderboard.style.display = 'block';
}