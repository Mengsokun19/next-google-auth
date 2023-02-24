// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Unauthenticated' })

    // remark: get auth user post
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          posts: {
            include: {
              comments: true,
            },
          },
        },
      })

      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error during fetching post' })
    }
  }
}
