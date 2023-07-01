import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './score.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) { }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('getRandomNumber')
    handleGetRandomNumber(client: Socket) {
        this.chatService.startSendingRandomNumbers(client);
    }

    handleDisconnect(client: Socket) {
        this.chatService.stopSendingRandomNumbers();
    }
}
