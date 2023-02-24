'use client'

import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AddComment({ id }: { id?: string }) {
  const [comment, setComment] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (data: { postId?: string; comment: string }) =>
      axios.post('/api/posts/addComment', { data }),
    {
      onError: (err) => {
        console.log(err)
        toast.error('Comment is required bro', {
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
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['detail-post'])
        toast.success('Comment created successfully 🔥', {
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
        setComment('')
        setIsDisable(false)
      },
    }
  )

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)
    // toast.loading('Adding Comment...', {
    //   duration: 4000,
    //   position: 'top-center',

    //   // Styling
    //   style: {
    //     backgroundColor: 'yellow',
    //     color: 'white',
    //     padding: '10px',
    //     fontSize: '1.5rem',
    //     fontWeight: 'bold',
    //   },

    //   // Custom Icon
    //   icon: '🤫Good night',
    // })
    mutate({ postId: id, comment })
  }

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a Comment</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          name="comment"
          placeholder="Add a comment"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <label
          className={`font-bold text-sm ${comment.length > 50 ? 'text-red-700' : 'text-gray-700'}`}
        >{`${comment.length}/50`}</label>
        <button
          type="submit"
          disabled={isDisable}
          className="text-sm bg-teal-600 text-white py-2 px-3 rounded-md disabled:opacity-25 hover:bg-teal-400"
        >
          Comment
        </button>
      </div>
    </form>
  )
}
