'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [isDisable, setIsDisable] = useState(false)

  // remark: create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (err) => {
        console.log(err)
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data.message, {
            duration: 4000,
            position: 'top-center',

            // Styling
            style: {
              backgroundColor: 'red',
              color: 'white',
              padding: '10px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            },

            // Custom Icon
            icon: '😌',
          })
          setIsDisable(false)
        }
      },
      onSuccess: (data) => {
        console.log(data)
        toast.success('Post created successfully 🔥', {
          duration: 4000,
          position: 'top-center',

          // Styling
          style: {
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            maxWidth: '500px',
          },

          // Custom Icon
          icon: '🥳',
        })
        setTitle('')
        setIsDisable(false)
      },
    }
  )

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title.length > 300) return

    setIsDisable(true)
    mutate(title)
  }

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(event) => setTitle(event.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${title.length > 300 ? 'text-red-700' : 'text-gray-700'}`}
        >{`${title.length}/300`}</p>
        <button
          type="submit"
          disabled={isDisable}
          className="text-sm bg-teal-600 text-white py-2 px-3 rounded-md disabled:opacity-25 hover:bg-teal-400"
        >
          Create a Post
        </button>
      </div>
    </form>
  )
}
