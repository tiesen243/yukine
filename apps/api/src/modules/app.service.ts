import { Injectable } from '@/core/decorators'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
