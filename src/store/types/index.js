// @flow

import {List} from 'immutable'

export const DOCUMENT_COMPONENT_TYPE: {[index: string]: number} = {
  PARAGRAPH: 0,
  HEADER_1: 1,
  HEADER_2: 2,
  HEADER_3: 3,
  CODE: 4
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
