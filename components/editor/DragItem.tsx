import { FC } from 'react'
import { useDrag } from 'react-dnd'

import { DragItemProps, PrimitiveTypes } from 'components/editor/types'
import PrimitiveButton from 'components/editor/primitives/PrimitiveButton'
import PrimitiveHeading from 'components/editor/primitives/PrimitiveHeading'
import PrimitiveInput from 'components/editor/primitives/PrimitiveInput'
import PrimitiveParagraph from 'components/editor/primitives/PrimitiveParagraph'

const DragItem: FC<DragItemProps> = ({ type }) => {
  const [, drag] = useDrag(() => ({
    item: { name: type },
    type,
  }))

  return (
    <div ref={drag}>
      {(() => {
        switch (type) {
          case PrimitiveTypes.PRIMITIVE_BUTTON:
            return <PrimitiveButton />
          case PrimitiveTypes.PRIMITIVE_HEADING:
            return <PrimitiveHeading />
          case PrimitiveTypes.PRIMITIVE_INPUT:
            return <PrimitiveInput />
          case PrimitiveTypes.PRIMITIVE_PARAGRAPH:
            return <PrimitiveParagraph />
          default:
            return null
        }
      })()}
    </div>
  )
}

export default DragItem
