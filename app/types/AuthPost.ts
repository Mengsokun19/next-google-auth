export type AuthPostType = {
  id: string
  email: string
  image: string
  name: string
  posts: {
    id: string
    title: string
    comments: {
      id: string
      postId: string
      userId: string
      title: string
    }[]
  }[]
}
