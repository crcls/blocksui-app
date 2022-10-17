import { ReactNode } from 'react'

export const PrimitiveTypes = {
  PRIMITIVE_BUTTON: 'PRIMITIVE_BUTTON',
  PRIMITIVE_CONTAINER: 'PRIMITIVE_CONTAINER',
  PRIMITIVE_FORM: 'PRIMITIVE_FORM',
  PRIMITIVE_HEADING: 'PRIMITIVE_HEADING',
  PRIMITIVE_INPUT: 'PRIMITIVE_INPUT',
  PRIMITIVE_MOONMAIL_CONNECTOR: 'PRIMITIVE_MOONMAIL_CONNECTOR',
  PRIMITIVE_PARAGRAPH: 'PRIMITIVE_PARAGRAPH',
  PRIMITIVE_TRANSITION: 'PRIMITIVE_TRANSITION',
}

export type DragItemProps = {
  type: string
}

export type DragItemWithDropZoneProps = {
  children?: ReactNode
  id?: any
  showButtons: Boolean
  type: string
}
