document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');

    // Een object om de status van elke toets bij te houden
    const keys = {};

    // Voeg keydown en keyup luisteraars toe om de status van elke toets bij te houden
    document.addEventListener('keydown', function(event) {
        keys[event.key] = true;
    });

    document.addEventListener('keyup', function(event) {
        keys[event.key] = false;
    });

    // Functie om de beweging van de bal te controleren
    function moveBall() {
        const ballStyle = getComputedStyle(ball);
        const ballLeft = parseInt(ballStyle.left);
        const ballTop = parseInt(ballStyle.top);

        // Controleer welke toetsen zijn ingedrukt en beweeg de bal dienovereenkomstig
        if (keys['ArrowUp']) {
            ball.style.top = (ballTop - 10) + 'px';
        }
        if (keys['ArrowDown']) {
            ball.style.top = (ballTop + 10) + 'px';
        }
        if (keys['ArrowLeft']) {
            ball.style.left = (ballLeft - 10) + 'px';
        }
        if (keys['ArrowRight']) {
            ball.style.left = (ballLeft + 10) + 'px';
        }

        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            alert('Je hebt alle munitie afgepakt, Gefeliciteerd!');
        }
    }

    // Roep de functie moveBall op met een interval om de beweging van de bal te controleren
    setInterval(moveBall, 50);

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
