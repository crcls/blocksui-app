import { useDrop } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'
import { useContext } from 'react'
import { GlobalContext } from '@/context/GlobalContext'
import PrimitiveContainer from './PrimitiveContainer'

const DropZone = () => {
  const { state } = useContext(GlobalContext)
  const { droppedItems } = state
  // console.log(droppedItems)
  // const [config, setConfig] = useState({})
  // const [droppedItems, setDroppedItems] = useState([])
  const ACCEPTS = Object.values(DnDPrimitiveTypes)
  // console.log(ACCEPTS)
  const [, drop] = useDrop(() => ({
    accept: ACCEPTS,
    drop: () => ({ name: 'DropZone' }),
    // collect: (monitor) => ({
    //   isOver: monitor.isOver(),
    //   canDrop: monitor.canDrop(),
    // }),
  }))

  return (
    <div
      ref={drop}
      className="h-full overflow-hidden rounded-lg bg-fuchsia-50 bg-white shadow"
    >
      {droppedItems.includes(DnDPrimitiveTypes.PRIMITIVE_CONTAINER) && (
        <PrimitiveContainer />
      )}
    </div>
  )
}

export default DropZone
