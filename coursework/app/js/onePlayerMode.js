let player = document.getElementById('player');
let computer = document.getElementById('computer');
let ball2 = document.getElementById('ball2');
let column2 = document.getElementById('column2');
let scoreP = 0;
let scoreC = 0;
let scoreText1 = document.getElementById('score1');
let controller1 = {
    'a': {pressed: false, direction: 'left'},
    'ф': {pressed: false, direction: 'left'},
    'd': {pressed: false, direction: 'right'},
    'в': {pressed: false, direction: 'right'}
};

document.addEventListener('keydown', function(event) {
    if(controller1[event.key]){{
        controller1[event.key].pressed = true;
    }}
});

document.addEventListener('keyup', (event) => {
    controller1[event.key].pressed = false;
 });

function movePlayer(direction) {
    let playerPosition = parseFloat(window.getComputedStyle(player).left);

    if (direction === 'left' && playerPosition > player.clientWidth/2) {
        player.style.left = (playerPosition - movementSpeed) + 'px';
    } else if (direction === 'right' && playerPosition < window.innerWidth / 2 - player.offsetWidth / 2) {
        player.style.left = (playerPosition + movementSpeed) + 'px';
    }
}

const executeMoves1 = () => {
    Object.keys(controller1).forEach(key=> {
      controller1[key].pressed && movePlayer(controller1[key].direction)
    })
}


let direction = 0;
function moveComputer(){
    let computerPosition = parseFloat(window.getComputedStyle(computer).left);
    
    if(computerPosition <= window.innerWidth / 2 + computer.offsetWidth){
        direction = 1;
    }
    else if(computerPosition >= window.innerWidth - computer.offsetWidth){
        direction = 0;
    }
    if(direction == 0 && computerPosition > window.innerWidth / 2 + computer.offsetWidth / 2){
        computer.style.left = (computerPosition - (movementSpeed*1.2)) + 'px';
    }
    else if(direction == 1 && computerPosition < window.innerWidth - 10 - computer.clientWidth/2){
        computer.style.left = (computerPosition + (movementSpeed*1.2)) + 'px';
    }
}




function startMatch(){
    onePlayerContainer.removeChild(ball2);
    ball2 = document.createElement('div');
    ball2.classList.add('ball');
    ball2.id = 'ball1';
    ball2.style.left = '150px';
    ball2.style.bottom = '120px';
    ball2.style.backgroundColor = colors[Math.floor(Math.random() * 3)];
    ball2.style.left = '300px';
    ball2.style.top = '150px';
    onePlayerContainer.appendChild(ball2);
    onePlayerContainer.removeChild(column2);
    column2 = document.createElement('div');
    column2.classList.add('column');
    column2.id = 'column2';
    column2.style.height = 35 + Math.floor(Math.random() * 10) + '%';
    onePlayerContainer.appendChild(column2);
    let x = 300;
    let y = 150;

    let xVelocity = 0;
    let yVelocity = 0;
    
    
    function update() {
        executeMoves1();
        moveComputer();
        if(xVelocity >= 8){
            xVelocity = 8;
        }
        if(yVelocity <= -8){
            yVelocity = -8;
        }
        x += xVelocity;
        y += yVelocity;
        
        yVelocity += gravity;
        let playerPosition = parseFloat(window.getComputedStyle(player).left);
        let computerPosition = parseFloat(window.getComputedStyle(computer).left);
        let playerRadius = player.offsetWidth / 2;
        let playerHeight = window.innerHeight - 175;
        if(x >= playerPosition - playerRadius && x <= playerPosition + playerRadius && y <= playerHeight){
            if(Math.pow(Math.abs(playerPosition-x),2)+Math.pow(window.innerHeight-100 - y,2) <= Math.pow(playerRadius + 30, 2)){
                xVelocity = Math.abs(playerPosition-x);
                yVelocity = -(window.innerHeight-100 - y);
            }
        }

        if(x >= computerPosition - playerRadius && x <= computerPosition + playerRadius && y <= playerHeight){
            if(Math.pow(Math.abs(x - computerPosition),2)+Math.pow(window.innerHeight-100 - y,2) <= Math.pow(playerRadius + 30, 2)){
                xVelocity = Math.abs(computerPosition-x);
                yVelocity = -(window.innerHeight-100 - y);
            }
        }

        if (x  <= 0 || x + ball2.offsetHeight >= window.innerWidth - 20) {
            xVelocity = -xVelocity;
        }

        if (y + ball2.offsetHeight >= window.innerHeight - 100) {
            xVelocity = 0;
            yVelocity = 0;
            if(x < column2.offsetLeft){
                scoreC++;
            }
            else{
                scoreP++;
            }
            scoreText1.textContent = scoreP + ':' + scoreC;
            return;
        }
    
        if (
            x + ball2.offsetWidth > column2.offsetLeft &&
            x < column2.offsetLeft + column2.offsetWidth &&
            y + ball2.offsetHeight > column2.offsetTop
        ) {
            xVelocity = -xVelocity;
        }
            
        ball2.style.left = x + 'px';
        ball2.style.top = y + 'px';
        requestAnimationFrame(update);
    }

    update();

}

document.addEventListener('mousedown', function () {
    
});