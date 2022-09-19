import { FC } from 'react'
import { useDrag } from 'react-dnd'

import { DnDPrimitiveTypes, DragItemProps } from './types'
import PrimitiveButton from '@/components/editor/primitives/PrimitiveButton'
import PrimitiveContainer from '@/components/editor/primitives/PrimitiveContainer'
import PrimitiveForm from '@/components/editor/primitives/PrimitiveForm'
import PrimitiveInput from '@/components/editor/primitives/PrimitiveInput'
import PrimitiveMoonmailConnector from '@/components/editor/primitives/PrimitiveMoonmailConnector'

const DragItem: FC<DragItemProps> = ({ type }) => {
  const [, drag] = useDrag(() => ({
    item: { name: type },
    type: type,
  }))

  return (
    <div ref={drag}>
      {(() => {
        switch (type) {
          case DnDPrimitiveTypes.PRIMITIVE_BUTTON:
            return <PrimitiveButton />
          case DnDPrimitiveTypes.PRIMITIVE_CONTAINER:
            return <PrimitiveContainer />
          case DnDPrimitiveTypes.PRIMITIVE_FORM:
            return <PrimitiveForm />
          case DnDPrimitiveTypes.PRIMITIVE_INPUT:
            return <PrimitiveInput />
          case DnDPrimitiveTypes.PRIMITIVE_MOONMAIL_CONNECTOR:
            return <PrimitiveMoonmailConnector />
          default:
            return null
        }
      })()}
    </div>
  )
}

export default DragItem
