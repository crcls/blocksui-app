import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const NavLinks: any = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return [
    ['Marketplace', '/marketplace'],
    ['Editor', '/editor'],
    ['FAQs', '/faqs'],
    ['Documentation', '/documentation'],
  ].map(([label, href], index) => (
    <Link
      className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors delay-150 hover:text-black hover:delay-[0ms]"
      href={href}
      key={label}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            className="absolute inset-0 rounded-lg bg-neutral-100"
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
            initial={{ opacity: 0 }}
            layoutId="hoverBackground"
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{label}</span>
    </Link>
  ))
}

export default NavLinks
