'use client'

import axios, { all } from 'axios'
import AddPost from './components/AddPost'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import Post from './components/Post'
import { PostType } from './types/Post'

// remark: fetch posts
const allPosts = async () => {
  const response = await axios.get('/api/posts/getPost')
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ['posts'],
  })

  // if (isLoading) return toast.loading('Loading....🥱')

  if (error) return error

  return (
    <main>
      <AddPost />
      {data?.map((post: PostType) => {
        return (
          <Post
            comments={post.comments}
            id={post.id}
            key={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
          />
        )
      })}
    </main>
  )
}
