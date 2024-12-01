import { JwtService } from '@nestjs/jwt/dist';

import { WssGuard } from './wss.guard';

describe('WssGuard', () => {
	it('should be defined', () => {
		expect(new WssGuard(new JwtService())).toBeDefined();
	});
});
