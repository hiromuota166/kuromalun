'use client'

import { useRouter } from 'next/router'

const ErrorPage = () => {
  const router = useRouter()
  const { message } = router.query

  return (
    <main>
      <h1>Error</h1>
      <p>{message ? decodeURIComponent(message as string) : 'An unexpected error occurred.'}</p>
    </main>
  )
}

export default ErrorPage
