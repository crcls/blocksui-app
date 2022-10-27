import { FC, useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import shortid from 'shortid'

import {
  DragItemWithDropZoneProps,
  PrimitiveTypes,
} from 'components/editor/types'
import { GlobalContext } from 'context/GlobalContext'
import PrimitiveContainer from 'components/editor/primitives/PrimitiveContainer'

const DragItemWithDropZone: FC<DragItemWithDropZoneProps> = ({
  children,
  id,
  showButtons,
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
  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ACCEPTS,
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
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

  const handleDownClick = (id: any) => {
    dispatch({
      payload: {
        direction: 'down',
        id,
      },
      type: 'MOVE_ITEM',
    })
  }

  const handleUpClick = (id: any) => {
    dispatch({
      payload: {
        direction: 'up',
        id,
      },
      type: 'MOVE_ITEM',
    })
  }

  return (
    <div ref={drag}>
      <div ref={drop}>
        <PrimitiveContainer
          handleDownClick={handleDownClick}
          handleUpClick={handleUpClick}
          id={id}
          isOver={canDrop && isOverCurrent}
          showButtons={showButtons}
          type={type}
        >
          {children}
        </PrimitiveContainer>
      </div>
    </div>
  )
}

export default DragItemWithDropZone
