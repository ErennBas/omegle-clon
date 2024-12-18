import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Res() res: Response, @Req() req: Request) {
		res.redirect(`http://localhost:4200${req.originalUrl}`);
	}
}
