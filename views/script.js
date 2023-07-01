const socket = io('http://localhost:3000');

// Handle receiving random number
socket.on('randomNumber', (randomNumber) => {
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = `Score: ${randomNumber}`;
    console.log(randomNumber);
    // console.log('Received random number:', randomNumber);
});

// Request a random number
socket.emit('getRandomNumber');
