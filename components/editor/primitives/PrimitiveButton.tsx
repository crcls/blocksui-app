import { FC } from 'react'

const PrimitiveButton: FC = () => {
  return (
    <button className="inline-flex cursor-move justify-center rounded-lg bg-neutral-800 py-2 px-3 text-sm font-semibold text-white outline-2 outline-offset-2 transition-colors hover:bg-black active:bg-neutral-800 active:text-white/80">
      Primitive Button
    </button>
  )
}

export default PrimitiveButton
