import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class WssGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext): any {
		console.log('wss geldi');
		const req = context.switchToWs().getClient();
		const token = req.handshake.headers.cookie
			.split(';')
			.find((cookie: string) => cookie.startsWith('token'))
			.split('=')[1];
		console.log(token);

		if (token) {
			try {
				const res = this.jwtService.verify(token);
				req.user = res;

				return true;
			} catch (error) {
				return false;
			}
		}
		return false;
	}
}
