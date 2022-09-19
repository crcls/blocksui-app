import { FC, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import {
  DnDPrimitiveTypes,
  DragItemWithDropZoneProps,
} from '@/components/editor/types'
import { GlobalContext } from '@/context/GlobalContext'
import PrimitiveContainer from '@/components/editor/primitives/PrimitiveContainer'
import PrimitiveForm from '@/components/editor/primitives/PrimitiveForm'
import PrimitiveMoonmailConnector from '@/components/editor/primitives/PrimitiveMoonmailConnector'

const DragItemWithDropZone: FC<DragItemWithDropZoneProps> = ({ type }) => {
  const { dispatch } = useContext(GlobalContext)
  const [, drag] = useDrag(() => ({
    item: { name: type },
    type: type,
  }))
  const [, drop] = useDrop({
    accept: [DnDPrimitiveTypes.PRIMITIVE_BUTTON],
    drop: (item: any) => {
      dispatch({
        payload: {
          block: {
            children: [],
            connections: [],
            id: item.name,
            props: {},
            type: item.name
              .split('_')
              .map(
                (element: any) =>
                  element.charAt(0) + element.slice(1).toLowerCase()
              )
              .join(''),
          },
          id: type
            .split('_')
            .map(
              (element: any) =>
                element.charAt(0) + element.slice(1).toLowerCase()
            )
            .join(''),
        },
        type: 'DROP_ITEM_IN_ITEM',
      })

      return { name: type }
    },
  })
  return (
    <div ref={drag}>
      <div ref={drop}>
        {(() => {
          switch (type) {
            case DnDPrimitiveTypes.PRIMITIVE_CONTAINER:
              return <PrimitiveContainer />
            case DnDPrimitiveTypes.PRIMITIVE_FORM:
              return <PrimitiveForm />
            case DnDPrimitiveTypes.PRIMITIVE_MOONMAIL_CONNECTOR:
              return <PrimitiveMoonmailConnector />
            default:
              return null
          }
        })()}
      </div>
    </div>
  )
}

export default DragItemWithDropZone
