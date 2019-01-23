// @flow

import {List} from 'immutable'

export const DOCUMENT_COMPONENT_TYPE: {[index: string]: string} = {
  PARAGRAPH: 'PARAGRAPH',
  HEADER: 'HEADER'
}

export type DocumentComponentType = $Values<typeof DOCUMENT_COMPONENT_TYPE>

export type DocumentComponentState = {
  id: string,
  content: string,
  focused: boolean,
  componentType: DocumentComponentType
}

export type DocumentState = {
  slug: string,
  components: List<DocumentComponentState>
}

export type CursorState = {
  x: number,
  y: number
}

export type EditorState = {
  cursor: CursorState,
  document: DocumentState
}
