// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Unauthenticated' })

    // remark: get user for the particular post
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      },
    })

    const title: string = req.body.title

    if (title.length > 300) return res.status(403).json({ message: 'Title is too long' })
    if (title === '') return res.status(403).json({ message: 'Title is required' })

    // remark: create a post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: user.id,
        },
      })

      return res.status(200).json(result)
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error during creating post' })
    }
  }
}
