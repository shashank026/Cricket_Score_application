import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
    private randomNumberInterval: NodeJS.Timer;
    private readonly validNumbers: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 6];

    startSendingRandomNumbers(socket: Socket) {
        this.randomNumberInterval = setInterval(() => {
            const randomNumberIndex = Math.floor(Math.random() * this.validNumbers.length);
            const randomNumber = this.validNumbers[randomNumberIndex];
            socket.emit('randomNumber', randomNumber); // Sends the random number to the client
        }, 1000); // Send random number every 10 seconds
    }

    stopSendingRandomNumbers() {
        clearInterval(this.randomNumberInterval);
    }
}
