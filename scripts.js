document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goals = document.querySelectorAll('.goal');
    const gameContainer = document.getElementById('game-container');

    // Beweging van de bal
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const ballStyle = getComputedStyle(ball);
        let ballLeft = parseInt(ballStyle.left);
        let ballTop = parseInt(ballStyle.top);

        switch (key) {
            case 'ArrowUp':
                ballTop = Math.max(ballTop - 10, 0);
                break;
            case 'ArrowDown':
                ballTop = Math.min(ballTop + 10, gameContainer.clientHeight - ball.clientHeight);
                break;
            case 'ArrowLeft':
                ballLeft = Math.max(ballLeft - 10, 0);
                break;
            case 'ArrowRight':
                ballLeft = Math.min(ballLeft + 10, gameContainer.clientWidth - ball.clientWidth);
                break;
        }

        // Verplaats de bal
        ball.style.left = ballLeft + 'px';
        ball.style.top = ballTop + 'px';

        // Controleer of de bal de container verlaat
        checkBoundary(ball);
        
        // Controleer winvoorwaarde voor elk doel
        goals.forEach(goal => {
            if (checkCollision(ball, goal)) {
                resetGoal(goal);
            }
        });
    });

    // Controleer of de bal het doel bereikt
    function checkCollision(ball, goal) {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
        return !(ballRect.right < goalRect.left || 
                 ballRect.left > goalRect.right || 
                 ballRect.bottom < goalRect.top || 
                 ballRect.top > goalRect.bottom);
    }

    // Teleporteer het doel naar het startpunt van de bal
    function resetGoal(goal) {
        const ballRect = ball.getBoundingClientRect();
        goal.style.left = ballRect.left + 'px';
        goal.style.top = ballRect.top + 'px';
    }

    // Voorkom dat de bal de container verlaat
    function checkBoundary(ball) {
        const ballRect = ball.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();
        if (ballRect.left < containerRect.left) {
            ball.style.left = containerRect.left + 'px';
        }
        if (ballRect.right > containerRect.right) {
            ball.style.left = containerRect.right - ball.clientWidth + 'px';
        }
        if (ballRect.top < containerRect.top) {
            ball.style.top = containerRect.top + 'px';
        }
        if (ballRect.bottom > containerRect.bottom) {
            ball.style.top = containerRect.bottom - ball.clientHeight + 'px';
        }
    }
});
