import { User } from '../../../../modules/user/models/domains/user.domain';

export abstract class AuthJwtService {
  abstract generateToken(email: string): Promise<string>;
  abstract verifyToken(token: string): Promise<User>;
}
