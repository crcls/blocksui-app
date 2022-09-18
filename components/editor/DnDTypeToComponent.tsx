import PrimitiveButton from '@/components/editor/PrimitiveButton'
import PrimitiveContainer from '@/components/editor/PrimitiveContainer'
import PrimitiveForm from '@/components/editor/PrimitiveForm'
import PrimitiveInput from '@/components/editor/PrimitiveInput'
import PrimitiveMooonmailConnector from '@/components/editor/PrimitiveMoonmailConnector'
import DragItemWithDropZone from '@/components/editor/DragItemWithDropZone'

export type DnDTypeToComponentKeyType =
  | 'PRIMITIVE_BUTTON'
  | 'PRIMITIVE_INPUT'
  | 'PRIMITIVE_MOONMAIL_CONNECTOR'
  | 'PRIMITIVE_FORM'
  | 'PRIMITIVE_CONTAINER'

const DnDTypeToComponent = {
  PRIMITIVE_BUTTON: <PrimitiveButton />,
  PRIMITIVE_INPUT: <PrimitiveInput />,
  PRIMITIVE_MOONMAIL_CONNECTOR: (
    <DragItemWithDropZone type="PRIMITIVE_MOONMAIL_CONNECTOR" />
  ),
  PRIMITIVE_FORM: <DragItemWithDropZone type="PRIMITIVE_FORM" />,
  PRIMITIVE_CONTAINER: <DragItemWithDropZone type="PRIMITIVE_CONTAINER" />,
}

export default DnDTypeToComponent
