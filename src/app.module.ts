import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ChatGateway } from './score.gateway';
// import { ChatService } from './score.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [], // Change the order of providers
})
export class AppModule { }
