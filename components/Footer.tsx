import { FC } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import Container from '@/components/Container'
import Logo from '@/components/Logo'
import NavLinks from '@/components/NavLinks'
import github from '../assets/github.svg'
import CrclsLogo from '@/components/CrclsLogo'

const Footer: FC = () => {
  return (
    <footer className="border-t border-neutral-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pt-16 pb-6 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-black">
              <Logo className="h-10 w-10 flex-none fill-neutral-500" />
              <div className="ml-4">
                <p className="text-base font-semibold">Blocks UI Protocol</p>
                <p className="mt-1 text-sm">
                  Decentralized UI software as an NFT.
                </p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks />
            </nav>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-neutral-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <Image alt="" className="w-full" src={github} />
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-black">
                <Link href="https://github.com/crcls">
                  <span className="absolute inset-0 sm:rounded-2xl" />
                  Our GitHub
                </Link>
              </p>
              <p className="mt-1 text-sm text-neutral-700">
                Become a contributor to the Blocks UI Protocol on GitHub.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-neutral-200 pt-8 pb-12 md:flex-row-reverse md:justify-between md:pt-6">
          <div className="flex w-full items-center justify-center md:w-auto">
            <p className="text-sm text-neutral-500">from</p>{' '}
            <CrclsLogo className="ml-4 h-6 w-auto" />
          </div>
          <p className="mt-6 text-sm text-neutral-500 md:mt-0">
            &copy; CRCLS Networks, Inc. {new Date().getFullYear()}. Released
            under the MIT License.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
