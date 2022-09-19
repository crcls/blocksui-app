import PrimitiveButton from '@/components/editor/primitives/PrimitiveButton'
import DragItemWithDropZone from '@/components/editor/DragItemWithDropZone'
import PrimitiveInput from '@/components/editor/primitives/PrimitiveInput'

const DnDTypeToComponent = {
  PRIMITIVE_BUTTON: <PrimitiveButton />,
  PRIMITIVE_CONTAINER: <DragItemWithDropZone type="PRIMITIVE_CONTAINER" />,
  PRIMITIVE_FORM: <DragItemWithDropZone type="PRIMITIVE_FORM" />,
  PRIMITIVE_INPUT: <PrimitiveInput />,
  PRIMITIVE_MOONMAIL_CONNECTOR: (
    <DragItemWithDropZone type="PRIMITIVE_MOONMAIL_CONNECTOR" />
  ),
}

export default DnDTypeToComponent
