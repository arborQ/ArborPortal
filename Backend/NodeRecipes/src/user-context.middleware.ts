import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.userContext = {
      userName: 'arbor',
      isAuthorized: true,
      roles: ['recipe'],
    };
    // tslint:disable-next-line:no-console
    console.log('in middleware');
    next();
  }
}
