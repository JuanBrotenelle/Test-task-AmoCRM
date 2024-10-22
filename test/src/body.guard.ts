import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BodyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { token, base_domain } = request.body;

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    if (!base_domain) {
      throw new BadRequestException('Base domain is missing');
    }

    return true;
  }
}
