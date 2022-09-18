import { forwardRef } from 'react'
import clsx from 'clsx'

const baseStyles: any = {
  solid: 'bg-white px-4 py-6 sm:rounded-lg sm:px-6 border-2 border-dashed',
}

interface Props {
  className?: string
  color?: string
  variant?: string
  [x: string]: any
}

const FakeContainer = forwardRef<any, Props>(
  ({ className, color = 'neutral', variant = 'solid', ...props }, ref) => {
    className = clsx(baseStyles[variant], className)

    return <div className={className} ref={ref} {...props} />
  }
)

FakeContainer.displayName = 'FakeContainer'

export default FakeContainer
