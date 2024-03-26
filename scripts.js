<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bal in container</title>
<style>
    #game-container {
        position: relative;
        width: 400px;
        height: 300px;
        border: 2px solid black;
        margin: 50px auto;
    }

    #ball {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
    }

    #goal {
        position: absolute;
        width: 50px;
        height: 50px;
        background-color: green;
        top: 120px;
        right: 0;
    }
</style>
</head>
<body>

<div id="game-container">
    <div id="ball"></div>
    <div id="goal"></div>
</div>

<script>
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
        const containerRect = gameContainer.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        // Nieuwe positie berekenen
        const newLeft = ballLeft + offsetX;
        const newTop = ballTop + offsetY;

        // Controleer of de nieuwe positie binnen de container is
        if (newLeft >= 0 && newTop >= 0 && newLeft + ballRect.width <= containerRect.width && newTop + ballRect.height <= containerRect.height) {
            ballLeft = newLeft;
            ballTop = newTop;
            ball.style.transform = `translate(${ballLeft}px, ${ballTop}px)`;

            // Controleer winvoorwaarde
            if (checkCollision(ball, goal)) {
                alert('bakker heeft de ontbijtkoek van je afgepakt ga nu voorin zitten!');
            }
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
</script>

</body>
</html>
