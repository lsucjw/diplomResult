import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/models/domains/user.domain';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user as User;
  },
);
