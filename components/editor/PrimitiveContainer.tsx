import { FC, useContext } from 'react'
import { useDrag } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'
import { GlobalContext } from 'context/GlobalContext'

const PrimitiveContainer: FC = () => {
  const { dispatch } = useContext(GlobalContext)
  const [, drag] = useDrag(() => ({
    type: DnDPrimitiveTypes.PRIMITIVE_CONTAINER,
    item: { name: DnDPrimitiveTypes.PRIMITIVE_CONTAINER },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        dispatch({ type: 'DROP_ITEM', payload: item.name })
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
