import { FC, useId } from 'react'
import clsx from 'clsx'
import Image from 'next/future/image'

import Container from '@/components/Container'
import Button from '@/components/Button'

import logoFilecoin from '@/assets/filecoin.svg'
import logoIpfs from '@/assets/ipfs.svg'
import logoLitProtocol from '@/assets/lit-protocol.svg'
import logoMoralis from '@/assets/moralis.svg'
import logoPolygon from '@/assets/polygon.svg'
import logoWeb3Storage from '@/assets/web3-storage.svg'

const BackgroundIllustration = (props: any) => {
  const id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-slow absolute inset-0 h-full w-full"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="black" />
            <stop offset="1" stopColor="black" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-reverse-slower absolute inset-0 h-full w-full"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="black" />
            <stop offset="1" stopColor="black" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

const Hero: FC = () => {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-black">
              Blocks UI Protocol—Decentralized UI Software as an NFT.
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              Providing an open and decentralized framework for building user
              interface software that is simple enough for anyone to use.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button href="/marketplace" variant="outline">
                Buy a Block
              </Button>
              <Button href="/editor">Build a Block</Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-neutral-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32"></div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm font-semibold text-black lg:text-left">
              Powered by
            </p>
            <ul
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
              role="list"
            >
              {[
                ['Filecoin', logoFilecoin],
                ['IPFS', logoIpfs],
                ['Lit Protocol', logoLitProtocol],
                ['Moralis', logoMoralis],
                ['Polygon', logoPolygon],
                ['Web3 Storage', logoWeb3Storage],
              ].map(([name, logo, className]) => (
                <li className={clsx('flex', className)} key={name}>
                  <Image alt={name} className="h-8 w-auto" src={logo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
