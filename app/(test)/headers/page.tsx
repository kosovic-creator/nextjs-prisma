import { headers, cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function HeadersDemo() {
    const headersList = await headers()
    const cookieStore = await cookies()
    const session = await getServerSession(authOptions)

    const userAgent = headersList.get('user-agent') ?? 'N/A'
    const referer = headersList.get('referer') ?? 'Direktno'
    const auth = headersList.get('authorization') ?? 'Nema token'

    // NextAuth cookies
    const sessionToken = cookieStore.get('next-auth.session-token')?.value ??
        cookieStore.get('__Secure-next-auth.session-token')?.value ??
        'Nema session cookie'

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1>Request Headers & Session</h1>
            <pre className="bg-gray-100 p-4 rounded mt-4">
                {`User-Agent: ${userAgent.slice(0, 100)}...
Referer: ${referer}
Authorization: ${auth}

Session Token (Cookie): ${sessionToken.slice(0, 50)}...
Session User: ${session?.user?.email || 'Nije prijavljen'}`}
            </pre>
        </div>
    )
}
