import { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const PrimitiveTransition: FC<Props> = ({ children }) => {
  return (
    <div className="relative cursor-move space-y-2 border-2 border-dashed bg-white px-4 py-6 sm:rounded-lg sm:px-6">
      <div className="absolute top-2 left-2 text-xs text-neutral-500">
        Transition
      </div>
      {children}
    </div>
  )
}

export default PrimitiveTransition
