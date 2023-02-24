export type Post = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    image: string
    email: string
    id: string
  }
  comments?: {
    createdAt: string
    id: string
    postId: string
    userId: string
    user: {
      name: string
      image: string
      email: string
      id: string
    }
  }[]
}
