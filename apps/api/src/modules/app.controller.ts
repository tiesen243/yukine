import { Controller, Get } from '@/core/decorators'
import { AppService } from '@/modules/app.service'

import pkg from '../../package.json' with { type: 'json' }

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  index() {
    return {
      message: `Welcome to the ${pkg.name}`,
      version: pkg.version,
    }
  }

  @Get('hello')
  getHello() {
    return this.appService.getHello()
  }
}
