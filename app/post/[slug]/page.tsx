'use client'

import AddComment from '@/app/components/AddComment'
import Post from '@/app/components/Post'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url) {
  const { data, isLoading } = useQuery({
    queryKey: ['detail-post'],
    queryFn: () => fetchDetails(url.params.slug),
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <Post
        id={data?.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.comments}
      />
      <AddComment id={data.id} />
      {data.comments.map((comment) => {
        return (
          <div key={comment.id} className="my-6 bg-white p-8 shadow-md rounded-sm">
            <div className="flex items-center gap-2">
              <Image
                src={comment.user.image}
                alt="profile"
                width={20}
                height={20}
                className="rounded-full"
              />
              <h3 className=" text-lg font-bold text-gray-600">{comment.user.name}</h3>
              <h2 className="text-sm text-gray-400">{comment.createdAt}</h2>
            </div>
            <p className="pt-3">{comment.message}</p>
          </div>
        )
      })}
    </div>
  )
}
