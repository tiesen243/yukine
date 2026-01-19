import { Module } from '@/core/decorators'
import { AppController } from '@/modules/app.controller'
import { AppService } from '@/modules/app.service'
import { PostModule } from '@/modules/post'

@Module({
  imports: [PostModule],
  controllers: [AppController],
  services: [AppService],
})
export class AppModule {}
