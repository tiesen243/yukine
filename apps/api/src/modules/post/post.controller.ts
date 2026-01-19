import { Body, Controller, Get, OpenAPI, Param, Post } from '@/core/decorators'
import { PostService } from '@/modules/post/post.service'

@Controller('/api/posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get('/')
  @OpenAPI({ summary: 'Get all posts', tags: ['posts'] })
  index() {
    return { message: 'List of all posts', posts: this.service.all() }
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get a single post by its ID', tags: ['posts'] })
  show(@Param() param: { id: string }) {
    return {
      message: 'Details of a single post',
      post: this.service.find(+param.id),
    }
  }

  @Post('/')
  @OpenAPI({ summary: 'Create a new post', tags: ['posts'] })
  create(@Body() body: { title: string; content: string }) {
    return {
      message: 'Post created successfully',
      post: this.service.create(body.title, body.content),
    }
  }
}
