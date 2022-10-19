import { useContext } from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

import LoggedInButtonPopUp from '@/components/LoggedInButtonPopUp'
import Logo from '@/components/Logo'

import { PublishContext } from '@/context/PublishContext'

const steps = ['Details', 'Mint', 'Complete']

const PublishHeader = () => {
  const { step } = useContext(PublishContext)

  return (
    <header className="relative border-b border-neutral-200 bg-white text-sm font-medium text-neutral-700">
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-end sm:justify-center">
          <Link href="/" className="absolute left-0 top-1/2 -mt-4">
            <span className="sr-only">Blocks UI Protocol</span>
            <Logo className="h-8 w-auto" />
          </Link>
          <nav aria-label="Progress" className="hidden sm:block">
            <ol role="list" className="flex space-x-4">
              <li className="flex items-center">
                <Link href="/editor">Edit</Link>
              </li>
              <ChevronRightIcon
                className="ml-4 h-5 w-5 text-neutral-300"
                aria-hidden="true"
              />
              {steps.map((stepName: string, stepIdx: number) => (
                <li key={`step-${stepIdx}`} className="flex items-center">
                  <span
                    className={stepIdx === step ? 'text-green-600' : undefined}
                  >
                    {stepName}
                  </span>
                  {stepIdx !== steps.length - 1 ? (
                    <ChevronRightIcon
                      className="ml-4 h-5 w-5 text-neutral-300"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>{' '}
          <div className="absolute right-0 -mt-2">
            <LoggedInButtonPopUp />
          </div>
        </div>
      </div>
    </header>
  )
}

export default PublishHeader
