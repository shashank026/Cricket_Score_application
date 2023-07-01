const socket = io('http://localhost:3000');
let scoreArray = [];
let score = 0;
let wicket = 0;
let balls = 0;
let overs = 0;

// Handle receiving random number
socket.on('randomNumber', (randomNumber) => {
    let scoreText = '';

    if (randomNumber === -3) {
        scoreText = 'No Ball';
        score++;
    } else if (randomNumber === -2) {
        scoreText = 'White Ball';
        score++;
    } else if (randomNumber === -1) {
        if (balls > 0 && scoreArray[balls - 1] === 'No Ball') {
            // Skip counting wicket if previous ball was a No Ball
            scoreText = 'No Wicket';
            balls++;
        } else {
            scoreText = 'Wicket';
            wicket++;
            balls++;
        }
    } else {
        scoreText = randomNumber.toString();
        score += randomNumber;
        balls++;
    }

    if (balls === 6) {
        balls = 0;
        overs++;
    }

    scoreArray.push(scoreText); // Add the new score to the score array
    displayScoreboard(); // Update the scoreboard display
});

// Request a random number
socket.emit('getRandomNumber');

// Function to display the scoreboard
function displayScoreboard() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = '';

    const scoreboard = document.createElement('div');
    scoreboard.className = 'scoreboard';

    // Reverse the score array before displaying
    const reversedScoreArray = scoreArray.slice().reverse();

    reversedScoreArray.forEach((score) => {
        const scoreItem = document.createElement('div');
        scoreItem.textContent = score;
        scoreboard.appendChild(scoreItem);
    });

    scoreElement.appendChild(scoreboard);

    // Update total score, wicket count, and overs
    const totalScoreElement = document.getElementById('totalScoreValue');
    const wicketElement = document.getElementById('wicketValue');
    const oversElement = document.getElementById('oversValue');
    totalScoreElement.textContent = score.toString();
    wicketElement.textContent = wicket.toString();
    oversElement.textContent = `${overs}.${balls}`;

    if (wicket === 10 || overs == 10) {
        socket.off('randomNumber'); // Stop listening for further score updates
        console.log('Inning Over!');
    }
}
