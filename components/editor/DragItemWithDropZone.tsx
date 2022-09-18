import { FC, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'
import { GlobalContext } from 'context/GlobalContext'
import PrimitiveContainer from './PrimitiveContainer'
import PrimitiveInput from './PrimitiveInput'
import PrimitiveButton from './PrimitiveButton'
import PrimitiveForm from './PrimitiveForm'
import PrimitiveMoonmailConnector from './PrimitiveMoonmailConnector'
import DropZone from '@/components/editor/DropZone'

interface DragItemWithDropZoneProps {
  type: string
}
const DragItemWithDropZone: FC<DragItemWithDropZoneProps> = ({ type }) => {
  const { dispatch } = useContext(GlobalContext)
  // console.log(type)
  const [, drag] = useDrag(() => ({
    type: type,
    item: { name: type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        // console.log('item name', item.name)
        dispatch({ type: 'DROP_ITEM', payload: item.name })
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  // const [{ handlerId }, drop] = useDrop({
  //   accept: [DnDPrimitiveTypes.PRIMITIVE_BUTTON],
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     }
  //   },
  //   drop: () => {
  //     console.log('dropped')
  //   },
  // })
  return (
    <div ref={drag}>
      {(() => {
        switch (type) {
          case DnDPrimitiveTypes.PRIMITIVE_CONTAINER:
            return <PrimitiveContainer />
          case DnDPrimitiveTypes.PRIMITIVE_MOONMAIL_CONNECTOR:
            return <PrimitiveMoonmailConnector />
          case DnDPrimitiveTypes.PRIMITIVE_FORM:
            return <PrimitiveForm />
          default:
            return null
        }
      })()}
    </div>
  )
}

export default DragItemWithDropZone