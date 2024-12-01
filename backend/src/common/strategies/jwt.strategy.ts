import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractFromCookie,
				JwtStrategy.extractFromHeader,
			]),
			ignoreExpiration: false,
			secretOrKey: 'jwtsecret',
		});
	}

	async validate(payload: any): Promise<any> {
		return payload;
	}

	private static extractFromCookie(req: Request): string | null {
		if (req.cookies && 'access_token' in req.cookies && req.cookies.access_token.length > 0) {
			return req.cookies.access_token;
		}

		return null;
	}

	private static extractFromHeader(req: Request): string | null {
		if (req.headers && 'authorization' in req.headers && req.headers.authorization.length > 0) {
			let token = req.headers.authorization;
			if (token && token.startsWith('Bearer ')) {
				return token.slice(7);
			}
		}

		return null;
	}
}
