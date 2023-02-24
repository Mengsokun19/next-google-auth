'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AuthPostType } from '../types/AuthPost'
import EditPost from './EditPost'

const fetchAuthPosts = async () => {
  const response = await axios.get('/api/posts/authPost')
  return response.data
}

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPostType>({
    queryFn: fetchAuthPosts,
    queryKey: ['auth-posts'],
  })

  if (isLoading) return <h1>Post is is loading.....</h1>
  return (
    <div className="">
      {data?.posts.map((post) => {
        return (
          <EditPost
            key={post.id}
            id={post.id}
            avatar={data.image}
            name={data.name}
            title={post.title}
            comments={post.comments}
          />
        )
      })}
    </div>
  )
}
