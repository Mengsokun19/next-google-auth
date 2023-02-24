// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import prisma from '../../../prisma/client'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Unauthorized' })
    // remark: get user
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    })

    // remark: add comment
    try {
      const { comment, postId } = req.body.data
      if (!comment.length) {
        return res.status(400).json({ message: 'Comment is required' })
      }

      const result = await prisma.comment.create({
        data: {
          message: comment,
          postId,
          userId: user?.id,
        },
      })
      return res.status(200).json(result)
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error during fetching post' })
    }
  }
}
