import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

import useAccount from '@/hooks/use-account'

interface Props {
  children: ReactNode
  redirectUrl?: string
}

const AuthenticatedPage = ({ children, redirectUrl }: Props) => {
  const { account, isLoading } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && account === null) {
      router.replace(redirectUrl || '/').catch(console.log)
    }
  }, [account, isLoading, redirectUrl, router])

  // TODO: a loading state would be good here
  return <>{account !== null && children}</>
}

export default AuthenticatedPage
