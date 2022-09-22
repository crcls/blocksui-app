import { Popover } from '@headlessui/react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMoralis } from 'react-moralis'

import Container from '@/components/Container'
import Logo from '@/components/Logo'
import NavLinks from '@/components/NavLinks'
import Button from '@/components/Button'
import LoggedInButtonPopUp from '@/components/LoggedInButtonPopUp'
import LoginModal from '@/components/LoginModal/LoginModal'

const ChevronUpIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M17 14l-5-5-5 5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MenuIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 6h14M5 18h14M5 12h14"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MobileNavLink = ({ children, ...props }: any) => (
  <Popover.Button
    as={Link}
    className="block text-base leading-7 tracking-tight text-neutral-700"
    {...props}
  >
    {children}
  </Popover.Button>
)

const Header: FC = () => {
  const { isAuthenticated } = useMoralis()
  const [modalOpened, setModalOpened] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setModalOpened(false)
    }
  }, [isAuthenticated, setModalOpened])

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link aria-label="Home" href="/">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    aria-label="Toggle site navigation"
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-black p-2 hover:bg-neutral-200/50 hover:stroke-neutral-600 active:stroke-black [&:not(:focus-visible)]:focus:outline-none"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          animate={{ opacity: 1 }}
                          as={motion.div}
                          className="fixed inset-0 z-0 bg-neutral-300/60 backdrop-blur"
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          static
                        />
                        <Popover.Panel
                          animate={{ opacity: 1, y: 0 }}
                          as={motion.div}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-neutral-50 px-6 pb-6 pt-32 shadow-2xl shadow-black/20"
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          initial={{ opacity: 0, y: -32 }}
                          static
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/marketplace">
                              Marketplace
                            </MobileNavLink>
                            <MobileNavLink href="/editor">Editor</MobileNavLink>
                            <MobileNavLink href="/faqs">FAQs</MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            {isAuthenticated ? (
                              <LoggedInButtonPopUp />
                            ) : (
                              <Button
                                onClick={() => {
                                  setModalOpened(true)
                                }}
                              >
                                Connect Wallet
                              </Button>
                            )}
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            {isAuthenticated ? (
              <LoggedInButtonPopUp />
            ) : (
              <Button
                onClick={() => {
                  setModalOpened(true)
                }}
              >
                Connect Wallet
              </Button>
            )}
          </div>
          {modalOpened && (
            <LoginModal
              handleClose={() => setModalOpened(false)}
              open={modalOpened}
            />
          )}
        </Container>
      </nav>
    </header>
  )
}

export default Header
