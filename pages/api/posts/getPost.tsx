// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // remark: get all posts
    try {
      const result = await prisma.post.findMany({
        include: {
          user: 1,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return res.status(200).json(result)
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error during fetching posts' })
    }
  }
}
