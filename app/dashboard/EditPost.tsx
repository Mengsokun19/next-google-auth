'use client'

import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { AuthPostType } from '../types/AuthPost'
import Image from 'next/image'
import { useState } from 'react'
import { EditProps } from '../types/EditPost'
import Toggle from './Toggle'
import { toast } from 'react-hot-toast'

export default function EditPost({ avatar, name, title, comments, id }: EditProps) {
  const [toggle, setToggle] = useState(false)
  let deleteToastId: string
  const queryClient = useQueryClient()

  // remark: delete post
  const { mutate } = useMutation(
    async (id: string) => await axios.delete('/api/posts/deletePost', { data: id }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['auth-posts'])
        toast.success('Post deleted successfully', { id: deleteToastId })
      },
      onError: (err) => {
        toast.error('Something went wrong.', { id: deleteToastId })
        console.log(err)
      },
    }
  )

  const deletePost = () => {
    deleteToastId = toast.loading('Deleting post...', { id: deleteToastId })
    mutate(id)
  }

  return (
    <>
      <div className=" bg-white my-8 p-8">
        <div className="flex items-center gap-1">
          <Image src={avatar} alt="avatar" width={40} height={40} className="rounded-full" />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">{comments?.length} Comment</p>
          <button onClick={(e) => setToggle(true)} className="text-sm font-bold text-red-500">
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle delPost={deletePost} setToggle={setToggle} />}
    </>
  )
}
