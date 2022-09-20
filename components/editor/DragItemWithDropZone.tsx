import { FC, useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import shortid from 'shortid'

import {
  DragItemWithDropZoneProps,
  PrimitiveTypes,
} from '@/components/editor/types'
import { GlobalContext } from '@/context/GlobalContext'
import PrimitiveContainer from '@/components/editor/primitives/PrimitiveContainer'
import PrimitiveForm from '@/components/editor/primitives/PrimitiveForm'
import PrimitiveMoonMailConnector from '@/components/editor/primitives/PrimitiveMoonMailConnector'
import PrimitiveTransition from '@/components/editor/primitives/PrimitiveTransition'

const DragItemWithDropZone: FC<DragItemWithDropZoneProps> = ({
  children,
  id,
  type,
}) => {
  const [, drag] = useDrag(() => ({
    item: { name: type },
    type,
  }))
  const ACCEPTS = Object.values(PrimitiveTypes)
  const { dispatch } = useContext(GlobalContext)
  const greedy = false
  // eslint-disable-next-line
  const [hasDropped, setHasDropped] = useState(false)
  // eslint-disable-next-line
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
  // eslint-disable-next-line
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ACCEPTS,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
      drop(_item: any, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop && !greedy) {
          return
        }

        dispatch({
          payload: {
            block: {
              children: [],
              connections: [],
              id: shortid.generate(),
              props: {},
              type: _item.name,
            },
            id,
          },
          type: 'DROP_ITEM_IN_ITEM',
        })
      },
    }),
    [greedy, setHasDropped, setHasDroppedOnChild]
  )

  return (
    <div ref={drag}>
      <div ref={drop}>
        {(() => {
          switch (type) {
            case PrimitiveTypes.PRIMITIVE_CONTAINER:
              return <PrimitiveContainer>{children}</PrimitiveContainer>
            case PrimitiveTypes.PRIMITIVE_FORM:
              return <PrimitiveForm>{children}</PrimitiveForm>
            case PrimitiveTypes.PRIMITIVE_MOONMAIL_CONNECTOR:
              return (
                <PrimitiveMoonMailConnector>
                  {children}
                </PrimitiveMoonMailConnector>
              )
            case PrimitiveTypes.PRIMITIVE_TRANSITION:
              return <PrimitiveTransition>{children}</PrimitiveTransition>
            default:
              return null
          }
        })()}
      </div>
    </div>
  )
}

export default DragItemWithDropZone
