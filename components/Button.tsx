import { forwardRef } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

const baseStyles = {
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
}
const variantStyles = {
  outline: {
    neutral:
      'border-neutral-300 text-neutral-700 hover:border-neutral-400 active:bg-neutral-100 active:text-neutral-700/80',
  },
  solid: {
    neutral:
      'bg-neutral-800 text-white hover:bg-black active:bg-neutral-800 active:text-white/80',
    white:
      'bg-white text-black hover:bg-white/90 active:bg-white/90 active:text-black/70',
  },
}

export const Button = forwardRef(function Button(
  { className, href, color = 'neutral', variant = 'solid', ...props },
  ref
) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  )

  return href ? (
    <Link className={className} href={href} ref={ref} {...props} />
  ) : (
    <button className={className} ref={ref} {...props} />
  )
})
