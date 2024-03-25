document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');

    // Huidige positie van de bal
    let ballLeft = 0;
    let ballTop = 0;

    // Bewegingsstap voor de bal
    const step = 10;

    // Beweging van de bal
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        switch (key) {
            case 'ArrowUp':
                moveBall(0, -step);
                break;
            case 'ArrowDown':
                moveBall(0, step);
                break;
            case 'ArrowLeft':
                moveBall(-step, 0);
                break;
            case 'ArrowRight':
                moveBall(step, 0);
                break;
        }
    });

    // Beweeg de bal met gegeven offset
    function moveBall(offsetX, offsetY) {
        ballLeft += offsetX;
        ballTop += offsetY;
        ball.style.transform = `translate(${ballLeft}px, ${ballTop}px)`;

        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            alert('bakker heeft de ontbijtkoek van je afgepakt ga nu voorin zitten!');
        }
    }

    // Controleer of de bal het doel bereikt
    function checkCollision(ball, goal) {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
        return !(ballRect.right < goalRect.left || 
                 ballRect.left > goalRect.right || 
                 ballRect.bottom < goalRect.top || 
                 ballRect.top > goalRect.bottom);
    }
});
