import { FC } from 'react'
import { useDrag } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'

const PrimitiveMoonmailConnector: FC = () => {
  const [, drag] = useDrag(() => ({ type: DnDPrimitiveTypes.PRIMITIVE_FORM }))
  return (
    <div ref={drag} className="overflow-hidden rounded-lg bg-pink-300 shadow">
      <div className="px-4 py-5 sm:p-6"></div>
    </div>
  )
}

export default PrimitiveMoonmailConnector
