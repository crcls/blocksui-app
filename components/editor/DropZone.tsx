import { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { DnDPrimitiveTypes } from '@/components/editor//types'
import { GlobalContext } from '@/context/GlobalContext'
import { DnDTypeToComponentKeyType } from '@/components/editor/types'
import DnDTypeToComponent from '@/components/editor/DnDTypeToComponent'

const DropZone = () => {
  const ACCEPTS = Object.values(DnDPrimitiveTypes)
  const { dispatch } = useContext(GlobalContext)
  const { state } = useContext(GlobalContext)
  const { droppedItems } = state
  const [, drop] = useDrop(() => ({
    accept: ACCEPTS,
    drop: (item: any) => {
      dispatch({
        payload: {
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
        type: 'DROP_ITEM',
      })

      return { name: 'DropZone' }
    },
  }))

  return (
    <div
      className="h-full overflow-hidden rounded-lg bg-fuchsia-50 bg-white shadow"
      ref={drop}
    >
      {droppedItems.map((droppedItem: any, index) => {
        const typeName = droppedItem.id
        const nameAsType = typeName as DnDTypeToComponentKeyType

        return <div key={index}>{DnDTypeToComponent[nameAsType]}</div>
      })}
    </div>
  )
}

export default DropZone
