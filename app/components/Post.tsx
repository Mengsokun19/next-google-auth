'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PostType } from '../types/Posts'

export default function Post({ avatar, name, postTitle, id, comments }) {
  console.log(id)
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image src={avatar} alt="profile" width={40} height={40} className="rounded-full" />
        <h3 className="font-bold text-gray-600">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">{comments.length} Comment</p>
        </Link>
      </div>
    </div>
  )
}
