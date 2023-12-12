let player = document.getElementById('player');
let computer = document.getElementById('computer');
let ball2 = document.getElementById('ball2');
let scoreP = 0;
let scoreC = 0;
let scoreText1 = document.getElementById('score1');
let controller1 = {
    'a': {pressed: false, direction: 'left'},
    'd': {pressed: false, direction: 'right'},
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

function moveComputer(){
    let computerPosition = parseFloat(window.getComputedStyle(computer).left);
    if(computerPosition){
        
    }
}


ball2.style.left = '300px';
ball2.style.top = '150px';

function startMatch(){
    ball2.style.left = '300px';
    ball2.style.top = '150px';
    let x = 300;
    let y = 150;

    let xVelocity = 0;
    let yVelocity = 0;
    let column = document.getElementById('column3');
    
    function update() {
        executeMoves1();
        moveComputer();
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
            if(x < column.offsetLeft){
                scoreC++;
            }
            else{
                scoreP++;
            }
            scoreText1.textContent = scoreP + ':' + scoreC;
            return;
        }
    
        if (
            x + ball2.offsetWidth > column.offsetLeft &&
            x < column.offsetLeft + column.offsetWidth &&
            y + ball2.offsetHeight > column.offsetTop
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