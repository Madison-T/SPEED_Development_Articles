import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const newUser = await this.authService.register(body.username, body.password);
    return newUser;
  }
}
