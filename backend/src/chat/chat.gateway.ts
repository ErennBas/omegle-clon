import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { Cache } from 'cache-manager';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) { }

	afterInit(server: Server) {
		console.log(server);
		console.log('WebSocket server initialized');
	}

	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
		this.cacheManager.set(client.id, client.id, 84600);
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
		this.cacheManager.del(client.id);
	}

	@SubscribeMessage('match')
	async handleMessage(client: Socket) {
	}

	@SubscribeMessage('joinRoom')
	async handleJoinRoom(client: Socket, room: string) {
		client.join(room);
	}

	@SubscribeMessage('leaveRoom')
	async handleLeaveRoom(client: Socket, room: string) {
		client.leave(room);
	}
}
