let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let ball3 = document.getElementById('ball3');
let column3= document.getElementById('column3');
let score1 = 0;
let score2 = 0;
let scoreText = document.getElementById('score');
const movementSpeed = 5;
let controller = {
    'a': {pressed: false, direction: 'left', id: 1},
    'ф': {pressed: false, direction: 'left', id: 1},
    'd': {pressed: false, direction: 'right', id: 1},
    'в': {pressed: false, direction: 'right', id: 1},
    'ArrowLeft': {pressed: false, direction: 'left', id: 2},
    'ArrowRight': {pressed: false, direction: 'right', id: 2},
};

document.addEventListener('keydown', function(event) {
    if(controller[event.key]){{
        controller[event.key].pressed = true;
    }}
});

document.addEventListener('keyup', (event) => {
    controller[event.key].pressed = false;
 });

function movePlayer2(direction, id) {
    if(id == 1){
        let player1Position = parseFloat(window.getComputedStyle(player1).left);

        if (direction === 'left' && player1Position > player1.clientWidth/2) {
            player1.style.left = (player1Position - movementSpeed) + 'px';
        } else if (direction === 'right' && player1Position < window.innerWidth / 2 - player1.offsetWidth / 2) {
            player1.style.left = (player1Position + movementSpeed) + 'px';
        }
    }
    else if(id == 2){
        let player2Position = parseFloat(window.getComputedStyle(player2).left);

        if (direction === 'left' && player2Position > window.innerWidth / 2 + player2.offsetWidth / 2) {
            player2.style.left = (player2Position - movementSpeed) + 'px';
        } else if (direction === 'right' && player2Position < window.innerWidth - 10 - player2.clientWidth/2) {
            player2.style.left = (player2Position + movementSpeed) + 'px';
        }
    }
  
}
const executeMoves = () => {
    Object.keys(controller).forEach(key=> {
      controller[key].pressed && movePlayer2(controller[key].direction, controller[key].id)
    })
}

ball3.style.left = '300px';
ball3.style.top = '150px';
const gravity = 0.1;

function startMatch2(){
    twoPlayersContainer.removeChild(ball3);
    ball3 = document.createElement('div');
    ball3.classList.add('ball');
    ball3.id = 'ball1';
    ball3.style.left = '150px';
    ball3.style.bottom = '120px';
    ball3.style.backgroundColor = colors[Math.floor(Math.random() * 3)];
    ball3.style.left = '300px';
    ball3.style.top = '150px';
    twoPlayersContainer.appendChild(ball3);
    twoPlayersContainer.removeChild(column3);
    column3 = document.createElement('div');
    column3.classList.add('column');
    column3.id = 'column3';
    column3.style.height = 35 + Math.floor(Math.random() * 10) + '%';
    twoPlayersContainer.appendChild(column3);
    let x = 300;
    let y = 150;

    let xVelocity = 0;
    let yVelocity = 0;
    
    
    function update() {
        executeMoves();
        if(xVelocity >= 8){
            xVelocity = 8;
        }
        if(yVelocity <= -8){
            console.log(yVelocity);
            yVelocity = -8;
        }
        x += xVelocity;
        y += yVelocity;
        
        yVelocity += gravity;
        let player1Position = parseFloat(window.getComputedStyle(player1).left);
        let player2Position = parseFloat(window.getComputedStyle(player2).left);
        let playerRadius = player1.offsetWidth / 2;
        let playerHeight = window.innerHeight - 175;
        if(x >= player1Position - playerRadius && x <= player1Position + playerRadius && y <= playerHeight){
            if(Math.pow(Math.abs(player1Position-x),2)+Math.pow(window.innerHeight-100 - y,2) <= Math.pow(playerRadius + 30, 2)){
                xVelocity = Math.abs(player1Position-x);
                yVelocity = -(window.innerHeight-100 - y);
            }
        }

        if(x >= player2Position - playerRadius && x <= player2Position + playerRadius && y <= playerHeight){
            if(Math.pow(Math.abs(x - player2Position),2)+Math.pow(window.innerHeight-100 - y,2) <= Math.pow(playerRadius + 30, 2)){
                xVelocity = Math.abs(player2Position-x);
                yVelocity = -(window.innerHeight-100 - y);
            }
        }

        if (x  <= 0 || x + ball3.offsetHeight >= window.innerWidth - 20) {
            xVelocity = -xVelocity;
        }

        if (y + ball3.offsetHeight >= window.innerHeight - 100) {
            xVelocity = 0;
            yVelocity = 0;
            if(x < column3.offsetLeft){
                score2++;
            }
            else{
                score1++;
            }
            scoreText.textContent = score1 + ':' + score2;
            return;
        }
    
        if (
            x + ball3.offsetWidth > column3.offsetLeft &&
            x < column3.offsetLeft + column3.offsetWidth &&
            y + ball3.offsetHeight > column3.offsetTop
        ) {
            xVelocity = -xVelocity;
        }
            
        ball3.style.left = x + 'px';
        ball3.style.top = y + 'px';
        requestAnimationFrame(update);
    }

    update();

}

document.addEventListener('mousedown', function () {
    
});