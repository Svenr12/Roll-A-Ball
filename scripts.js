document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');
    const containerRect = gameContainer.getBoundingClientRect();

    // Beweging van de bal
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const ballStyle = getComputedStyle(ball);
        let ballLeft = parseInt(ballStyle.left);
        let ballTop = parseInt(ballStyle.top);

        switch (key) {
            case 'ArrowUp':
                ballTop = Math.max(ballTop - 10, containerRect.top); // Controleer bovenste grens
                break;
            case 'ArrowDown':
                ballTop = Math.min(ballTop + 10, containerRect.bottom - ball.clientHeight); // Controleer onderste grens
                break;
            case 'ArrowLeft':
                ballLeft = Math.max(ballLeft - 10, containerRect.left); // Controleer linker grens
                break;
            case 'ArrowRight':
                ballLeft = Math.min(ballLeft + 10, containerRect.right - ball.clientWidth); // Controleer rechter grens
                break;
        }

        // Pas de positie van de bal aan
        ball.style.left = ballLeft + 'px';
        ball.style.top = ballTop + 'px';

        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            alert('Je hebt alle munitie afgepakt, Gefeliciteerd');
        }
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
});
