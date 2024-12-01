import { Controller, Post, Body, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { IUser } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async create(@Body() registerDto: AuthDto, @Res({ passthrough: true }) res) {
		const result = await this.authService.register(registerDto);
		res.cookie('access_token', result.access_token, {
			maxAge: 2592000000,
			sameSite: true,
			secure: false,
		});

		return result;
	}

	@Post('login')
	async login(@Body() loginDto: AuthDto, @Res({ passthrough: true }) res) {
		const result = await this.authService.login(loginDto);
		res.cookie('access_token', result.access_token, {
			maxAge: 2592000000,
			sameSite: true,
			secure: false,
		});

		return result;
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('check')
	async check(@Req() req) {
		return req.user;
	}

	@UseGuards(AuthGuard('google'))
	@Post('google')
	// eslint-disable-next-line no-empty-function
	async auth() {}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuthCallback(@Req() req: Request & { user: IUser }, @Res() res) {
		const result = await this.authService.googleLogin(req.user);

		res.redirect(`http://localhost:4200?access_token=${result.access_token}`);
	}
}
