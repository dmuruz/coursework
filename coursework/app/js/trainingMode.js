var score = 0;
let energy = 0;
let ball1 = document.getElementById('ball1');
let colors = ['red', 'green', 'blue'];
let column1 = document.getElementById('column1');

document.addEventListener('DOMContentLoaded', function () {
    
    const filler = document.getElementById('filler');
    let isMouseDown = false;
    let isFilling = true;
    let ground = document.querySelector('.ground');
    let isMoving = false;

    trainingContainer.addEventListener('mousedown', function () {
        if (!isMoving) {
            isMouseDown = true;
            energy = 0;
        }
    });

    trainingContainer.addEventListener('mouseup', function () {
        if (!isMoving && isMouseDown) {
            isMouseDown = false;
            isMoving = true;
            shootBall();
        }
    });

    function shootBall() {
        const angle = Math.PI / 4; 
        const speed = 7 + energy * 0.1;

        const xVelocity = speed * Math.cos(angle);
        const yVelocity = -speed * Math.sin(angle);

        animateBall(xVelocity, yVelocity);
    }

    function animateBall(xVelocity, yVelocity) {
        let x = 150;
        let y = window.innerHeight - ball1.offsetHeight - ground.offsetHeight;
        const gravity = 0.2;

        function update() {
            x += xVelocity;
            y += yVelocity;
            yVelocity += gravity;

            if (ball1.offsetHeight >= window.innerWidth - 20) {
                endTraining(score);
            } 

            if (y + ball1.offsetHeight >= window.innerHeight - ground.offsetHeight) {
                xVelocity = 0;
                yVelocity = 0;
                if(x < column1.offsetLeft){
                    
                    endTraining(score);
                    isMoving = false;
                    return;
                }
                else{
                    score++;
                    isMoving = false;
                    setupBall();
                    return;
                }
            }

            if (
                x + ball1.offsetWidth > column1.offsetLeft &&
                x < column1.offsetLeft + column1.offsetWidth &&
                y + ball1.offsetHeight > column1.offsetTop
            ) {
                xVelocity = -xVelocity;
            }
                
            ball1.style.left = x + 'px';
            ball1.style.top = y + 'px';
            requestAnimationFrame(update);
        }

        update();
    }

    function updateEnergy() {
        if(isMouseDown){
            if(isFilling && energy < 100){
                energy += 1;
            }
            if(isFilling && energy >= 100){
                isFilling = false;
            }
            if(!isFilling && energy > 0){
                energy -= 1;
            }
            if(!isFilling && energy <= 0){
                isFilling = true;
            }
        }
        filler.style.width = energy + '%';
        requestAnimationFrame(updateEnergy);
    }

    updateEnergy();
});

function setupTraining(){
    trainingContainer.style.display = 'block';
    trainingEndMenu.style.display = 'none';
    score = 0;
    setupBall();
}
function setupBall(){
    trainingContainer.removeChild(ball1);
    ball1 = document.createElement('div');
    ball1.classList.add('ball');
    ball1.id = 'ball1';
    ball1.style.left = '150px';
    ball1.style.bottom = '120px';
    ball1.style.backgroundColor = colors[Math.floor(Math.random() * 3)];
    trainingContainer.appendChild(ball1);
    trainingContainer.removeChild(column1);
    column1 = document.createElement('div');
    column1.classList.add('column');
    column1.id = 'column1';
    column1.style.height = 35 + Math.floor(Math.random() * 10) + '%';
    trainingContainer.appendChild(column1);
    energy = 0;
    filler.style.width = '0%';
}