import { forwardRef } from 'react'
import clsx from 'clsx'

const baseStyles = {
  solid: 'bg-white px-4 py-6 sm:rounded-lg sm:px-6 border-2 border-dashed',
}

export const FakeContainer = forwardRef(function FakeContainer(
  { className, href, color = 'neutral', variant = 'solid', ...props },
  ref
) {
  className = clsx(baseStyles[variant], className)

  return <div className={className} ref={ref} {...props} />
})
