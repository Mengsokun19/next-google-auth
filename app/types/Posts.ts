export type PostType = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    image: string
  }
  comments?: {
    createdAt: string
    id: string
    postId: string
    userId: string
  }[]
}
