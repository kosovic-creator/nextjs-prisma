/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post: { id: string | number; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }, index: number) => (
        <div key={post.id || index}>
          <li>{post.title}</li>
          <li>{post.id}</li>
        </div>
      ))}
    </ul>
  )
}