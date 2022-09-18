import PrimitiveButton from '@/components/editor/PrimitiveButton'
import PrimitiveContainer from '@/components/editor/PrimitiveContainer'
import PrimitiveForm from '@/components/editor/PrimitiveForm'
import PrimitiveInput from '@/components/editor/PrimitiveInput'
import PrimitiveMooonmailConnector from '@/components/editor/PrimitiveMoonmailConnector'

const DnDTypeToComponent = {
  PRIMITIVE_BUTTON: <PrimitiveButton />,
  PRIMITIVE_INPUT: <PrimitiveInput />,
  PRIMITIVE_MOONMAIN_CONNECTOR: <PrimitiveMooonmailConnector />,
  PRIMITIVE_FORM: <PrimitiveForm />,
  PRIMITIVE_CONTAINER: <PrimitiveContainer />,
}

export default DnDTypeToComponent
