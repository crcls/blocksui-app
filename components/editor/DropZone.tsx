import { useDrop } from 'react-dnd'
import DnDPrimitiveTypes from './DnDPrimitiveTypes'
import { useState } from 'react'

const DropZone = () => {
  const [config, setConfig] = useState({})
  conds [droppesItems, setDroppedItems] = useState([])
  const ACCEPTS = Object.values(DnDPrimitiveTypes)

  return (
    <div className="h-full overflow-hidden rounded-lg bg-fuchsia-50 bg-white shadow">
      hello
    </div>
  )
}

export default DropZone
