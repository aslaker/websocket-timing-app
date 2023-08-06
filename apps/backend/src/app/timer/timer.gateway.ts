import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TimerGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  sessionNamespaces: string[] = ['KVTY', 'BTOS', 'NWLD'];

  handleConnection(client: Socket) {
    console.log(client.data);
  }

  @SubscribeMessage('race_init')
  handleRaceInit(client: Socket, payload: string) {
    console.log({ event: 'RACE INIT', data: client.data, payload });
    this.server.of('/test').emit('race_init', 'raceInitialized');
  }

  @SubscribeMessage('race_complete')
  handleRaceComplete(client: Socket, payload: string) {
    console.log({ event: 'RACE COMPLETE', data: client.data, payload });
  }

  @SubscribeMessage('racer_start')
  handleRacerStart(client: Socket, payload: string) {
    console.log({ event: 'START', data: client.data, payload });
  }

  @SubscribeMessage('racer_finish')
  handleRacerFinish(client: Socket, payload: string) {
    console.log({ event: 'STOP', data: client.data, payload });
  }
}
