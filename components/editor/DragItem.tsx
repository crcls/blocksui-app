import { FC, useContext } from 'react'
import { useDrag } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'
import { GlobalContext } from 'context/GlobalContext'
import PrimitiveContainer from './PrimitiveContainer'
import PrimitiveInput from './PrimitiveInput'
import PrimitiveButton from './PrimitiveButton'
import PrimitiveForm from './PrimitiveForm'
import PrimitiveMoonmailConnector from './PrimitiveMoonmailConnector'

interface DragItemProps {
  type: string
}
const DragItem: FC<DragItemProps> = ({ type }) => {
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
          case DnDPrimitiveTypes.PRIMITIVE_INPUT:
            return <PrimitiveInput />
          case DnDPrimitiveTypes.PRIMITIVE_BUTTON:
            return <PrimitiveButton />

          default:
            return null
        }
      })()}
    </div>
  )
}

export default DragItem
