import { FC } from 'react'
import { useDrag } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'

const PrimitiveContainer: FC = () => {
  const [, drag] = useDrag(() => ({
    type: DnDPrimitiveTypes.PRIMITIVE_CONTAINER,
  }))
  return (
    <div
      ref={drag}
      className="overflow-hidden rounded-lg bg-lime-300 bg-white shadow"
    >
      <div className="px-4 py-5 sm:p-6"></div>
    </div>
  )
}

export default PrimitiveContainer
