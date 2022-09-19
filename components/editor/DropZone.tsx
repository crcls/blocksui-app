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
      dispatch({
        type: 'DROP_ITEM',
        payload: {
          id: item.name,
          type: item.name
            .split('_')
            .map(
              (element) => element.charAt(0) + element.slice(1).toLowerCase()
            )
            .join(''),
          props: {},
          connections: [],
          children: [],
        },
      })
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
        const typeName = droppedItem.id
        const nameAsType = typeName as DnDTypeToComponentKeyType
        return <div key={index}>{DnDTypeToComponent[nameAsType]}</div>
      })}
    </div>
  )
}

export default DropZone
