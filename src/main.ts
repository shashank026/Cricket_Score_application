import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Specify the views directory and the default view engine
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Configure Socket.io adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  // Create a Socket.io server
  const server = app.getHttpServer();
  const io = new socketio.Server(server);

  // Handle connections
  let randomNumber = null; // Declare a variable to store the random number

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // Send the current random number to the newly connected client
    if (randomNumber !== null) {
      socket.emit('randomNumber', randomNumber);
    }

    // Start sending random numbers to all connected clients
    if (randomNumber === null) {
      setInterval(() => {
        randomNumber = [-3, -2, -1, 0, 1, 2, 3, 4, 6][Math.floor(Math.random() * 9)];
        io.emit('randomNumber', randomNumber);
      }, 1500);
    }
  });

  await app.listen(3000);
}
bootstrap();
