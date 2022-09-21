import { useContext, useState } from 'react'
import { useDrop } from 'react-dnd'
import shortid from 'shortid'

import { PrimitiveTypes } from '@/components/editor/types'
import DragItem from '@/components/editor/DragItem'
import DragItemWithDropZone from '@/components/editor/DragItemWithDropZone'
import { GlobalContext } from '@/context/GlobalContext'

const primitiveToComponent = (droppedItem: any) => {
  if (
    droppedItem.type === PrimitiveTypes.PRIMITIVE_BUTTON ||
    droppedItem.type === PrimitiveTypes.PRIMITIVE_HEADING ||
    droppedItem.type === PrimitiveTypes.PRIMITIVE_INPUT ||
    droppedItem.type === PrimitiveTypes.PRIMITIVE_PARAGRAPH
  ) {
    return <DragItem type={droppedItem.type} />
  } else {
    return (
      <DragItemWithDropZone id={droppedItem.id} type={droppedItem.type}>
        {droppedItem.children.map((droppedItemChild: any, index: any) => (
          <div key={index}>{primitiveToComponent(droppedItemChild)}</div>
        ))}
      </DragItemWithDropZone>
    )
  }
}

const DropZone = () => {
  const ACCEPTS = Object.values(PrimitiveTypes)
  const { dispatch } = useContext(GlobalContext)
  const greedy = false
  // eslint-disable-next-line
  const [hasDropped, setHasDropped] = useState(false)
  // eslint-disable-next-line
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
  const { state } = useContext(GlobalContext)
  const { droppedItems } = state
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
        setHasDropped(true)
        setHasDroppedOnChild(didDrop)

        dispatch({
          payload: {
            children: [],
            connections: [],
            id: shortid.generate(),
            props: {},
            type: _item.name,
          },
          type: 'DROP_ITEM',
        })
      },
    }),
    [greedy, setHasDropped, setHasDroppedOnChild]
  )

  return (
    <div
      className="h-full space-y-2 py-4 sm:space-y-4 sm:px-6 lg:px-8"
      ref={drop}
    >
      {!droppedItems.length && (
        <div className="flex h-full">
          <div className="m-auto text-center">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900">
              No block
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Get started by adding a primtive.
            </p>
          </div>
        </div>
      )}
      {droppedItems.map((droppedItem: any, index) => (
        <div key={index}>{primitiveToComponent(droppedItem)}</div>
      ))}
    </div>
  )
}

export default DropZone
