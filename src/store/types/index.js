// @flow

import {List} from 'immutable'

export type DocumentComponentState = {
  id: string,
  content: string,
  focused: boolean
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
