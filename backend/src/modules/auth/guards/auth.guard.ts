import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthJwtService } from '../services/contracts/auth-jwt.service.contract';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    request.user = await this.authService.verifyToken(
      this.getTokenInHeader(request.headers.authorization),
    );

    return true;
  }

  private getTokenInHeader(header: string): string {
    return header.split('Bearer ')[1];
  }
}