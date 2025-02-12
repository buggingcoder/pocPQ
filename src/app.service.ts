import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(`Server started at PORT ${3000}`);
    return 'Hello World!';
  }
}
