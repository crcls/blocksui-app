import { ReactNode } from 'react'

export const PrimitiveTypes = {
  PRIMITIVE_BUTTON: 'Button',
  PRIMITIVE_CONTAINER: 'Container',
  PRIMITIVE_FORM: 'Form',
  PRIMITIVE_HEADING: 'Heading',
  PRIMITIVE_INPUT: 'Input',
  PRIMITIVE_MOONMAIL_CONNECTOR: 'MoonmailConnector',
  PRIMITIVE_PARAGRAPH: 'Paragraph',
  PRIMITIVE_TRANSITION: 'FadeTransition',
}

export type DragItemProps = {
  type: string
}

export type DragItemWithDropZoneProps = {
  children?: ReactNode
  id?: any
  type: string
}
