import { useDrop } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'
import { useContext } from 'react'
import { GlobalContext } from '@/context/GlobalContext'
import DnDTypeToComponent, {
  DnDTypeToComponentKeyType,
} from './DnDTypeToComponent'

const DropZone = () => {
  const { state } = useContext(GlobalContext)
  const { droppedItems } = state
  const { dispatch } = useContext(GlobalContext)
  // const [config, setConfig] = useState({})
  // const [droppedItems, setDroppedItems] = useState([])
  const ACCEPTS = Object.values(DnDPrimitiveTypes)
  const [, drop] = useDrop(() => ({
    accept: ACCEPTS,
    drop: (item) => {
      dispatch({ type: 'DROP_ITEM', payload: item.name })
      return { name: 'DropZone' }
    },
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
      {droppedItems.map((droppedItem, index) => {
        const typeName = droppedItem
        const nameAsType = typeName as DnDTypeToComponentKeyType
        return <div key={index}>{DnDTypeToComponent[nameAsType]}</div>
      })}
    </div>
  )
}

export default DropZone
