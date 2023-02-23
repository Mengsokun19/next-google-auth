'use client'

import axios, { all } from 'axios'
import AddPost from './components/AddPost'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import Post from './components/Post'

// remark: fetch posts
const allPosts = async () => {
  const response = await axios.get('/api/posts/getPost')
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery({ queryFn: allPosts, queryKey: ['posts'] })

  if (isLoading)
    return toast.loading('Loading....🥱', {
      duration: 4000,
      position: 'top-center',

      // Styling
      style: {
        backgroundColor: 'lightYellow',
        color: 'white',
        padding: '10px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        maxWidth: '500px',
      },

      // Custom Icon
      icon: '🤫',
    })
  if (error)
    return toast.error('Something went wrong 🤯', {
      duration: 4000,
      position: 'top-center',

      // Styling
      style: {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        maxWidth: '500px',
      },

      // Custom Icon
      icon: '😌',
    })

  return (
    <main>
      <AddPost />
      {data?.map((post) => {
        return (
          <Post
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
