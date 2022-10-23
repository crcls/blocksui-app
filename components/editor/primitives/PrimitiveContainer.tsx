import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

import { PrimitiveTypes } from '@/components/editor/types'

const baseStyles =
  'relative cursor-move space-y-2 border-2 border-dashed px-4 py-6 sm:rounded-lg sm:px-6'

type TypeKeys = keyof typeof PrimitiveTypes
type TypeValues = typeof PrimitiveTypes[TypeKeys]

interface Props {
  children?: ReactNode
  handleDownClick: Function
  handleUpClick: Function
  id: any
  isOver: Boolean
  showButtons: Boolean
  type: TypeValues
}

const PrimitiveContainer: FC<Props> = ({
  children,
  handleDownClick,
  handleUpClick,
  id,
  isOver,
  showButtons,
  type,
}) => {
  const className = clsx(
    baseStyles,
    showButtons && isOver ? 'bg-green-100' : 'bg-white'
  )

  return (
    <div className={className}>
      <div className="absolute top-2 left-2 text-xs text-neutral-500">
        <div className="md:flex md:items-center md:justify-between md:space-x-4">
          {showButtons && (
            <div className="flex space-x-3">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-neutral-300 bg-white p-1 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                onClick={() => handleUpClick(id)}
              >
                <ChevronUpIcon
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-neutral-300 bg-white p-1 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                onClick={() => handleDownClick(id)}
              >
                <ChevronDownIcon
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
          <div>
            {(() => {
              switch (type) {
                case PrimitiveTypes.PRIMITIVE_CONTAINER:
                  return 'Container'
                case PrimitiveTypes.PRIMITIVE_FORM:
                  return 'Form'
                case PrimitiveTypes.PRIMITIVE_MOONMAIL_CONNECTOR:
                  return 'MoonMail Connector'
                case PrimitiveTypes.PRIMITIVE_TRANSITION:
                  return 'Transition'
                default:
                  return null
              }
            })()}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default PrimitiveContainer
