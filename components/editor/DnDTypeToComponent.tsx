import PrimitiveButton from '@/components/editor/PrimitiveButton'
import PrimitiveContainer from '@/components/editor/PrimitiveContainer'
import PrimitiveForm from '@/components/editor/PrimitiveForm'
import PrimitiveInput from '@/components/editor/PrimitiveInput'
import PrimitiveMooonmailConnector from '@/components/editor/PrimitiveMoonmailConnector'

export type DnDTypeToComponentKeyType =
  | 'PRIMITIVE_BUTTON'
  | 'PRIMITIVE_INPUT'
  | 'PRIMITIVE_MOONMAIL_CONNECTOR'
  | 'PRIMITIVE_FORM'
  | 'PRIMITIVE_CONTAINER'

const DnDTypeToComponent = {
  PRIMITIVE_BUTTON: <PrimitiveButton />,
  PRIMITIVE_INPUT: <PrimitiveInput />,
  PRIMITIVE_MOONMAIL_CONNECTOR: <PrimitiveMooonmailConnector />,
  PRIMITIVE_FORM: <PrimitiveForm />,
  PRIMITIVE_CONTAINER: <PrimitiveContainer />,
}

export default DnDTypeToComponent
