export class PostService {
  private static counter = 2

  private posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' },
  ]

  all() {
    return this.posts
  }

  find(id: number) {
    return this.posts.find((post) => post.id === id) ?? null
  }

  create(title: string, content: string) {
    const newPost = { id: ++PostService.counter, title, content }
    this.posts.push(newPost)
    return newPost
  }

  update(id: number, title: string, content: string) {
    // oxlint-disable-next-line no-array-callback-reference
    const post = this.find(id)
    if (!post) return null

    post.title = title
    post.content = content
    this.posts = this.posts.map((p) => (p.id === id ? post : p))
    return post
  }

  delete(id: number) {
    const index = this.posts.findIndex((post) => post.id === id)
    if (index !== -1) return this.posts.splice(index, 1)[0] ?? null
    return null
  }
}
