import { Injectable } from '@/core/decorators'

@Injectable()
export class PostService {
  static numberOfPosts = 2

  private posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' },
  ]

  all() {
    return this.posts
  }

  find(id: number) {
    return this.posts.find((post) => post.id === id)
  }

  create(title: string, content: string) {
    const id = ++PostService.numberOfPosts
    const newPost = { id, title, content }
    this.posts.push(newPost)
    return newPost
  }

  delete(id: number) {
    const index = this.posts.findIndex((post) => post.id === id)
    if (index !== -1) {
      const deletedPost = this.posts.splice(index, 1)[0]
      return deletedPost
    }

    return null
  }
}
