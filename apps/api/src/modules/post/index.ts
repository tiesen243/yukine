import { Module } from '@/core/decorators'
import { PostController } from '@/modules/post/post.controller'
import { PostService } from '@/modules/post/post.service'

@Module({
  controllers: [PostController],
  services: [PostService],
})
export class PostModule {}
