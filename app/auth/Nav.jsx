import Link from 'next/link'
import Login from './Login'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import Logged from './Logged'

export default async function Nav() {
  const session = await getServerSession(authOptions)
  const img = session.user.image

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={'/'}>
        <h1 className="font-bold text-lg">Send it</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={img ? img : ''} />}
      </ul>
    </nav>
  )
}
