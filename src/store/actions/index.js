// @flow
import type {
  DocumentComponentState
} from '../types'

export type DocumentAction = {
  type: 'SET_DOCUMENT',
  slug: string,
  content: DocumentComponentState[]
}

export type AppendComponentAction = {
  type: 'APPEND_COMPONENT',
  after: string,
  id: string,
  content: string,
  focused: boolean
}

export type UpdateComponentAction = {
  type: 'UPDATE_COMPONENT',
  id: string,
  content: string
}

export type FocusComponentAction = {
  type: 'FOCUS_COMPONENT',
  id: string
}

export type CursorPositionAction = {
  type: 'CURSOR_POSITION',
  x: number,
  y: number
}

export type Action = DocumentAction | AppendComponentAction | UpdateComponentAction | FocusComponentAction | CursorPositionAction | $Exact<{type: 'EMPTY'}>

export const SetDocument = (slug: string, content: DocumentComponentState[]): DocumentAction => ({
  type: 'SET_DOCUMENT',
  slug,
  content
})

export const AppendComponent = (after: string, id: string, content: string, focused: boolean = true): AppendComponentAction => ({
  type: 'APPEND_COMPONENT',
  after,
  id,
  content,
  focused
})

export const UpdateComponent = (id: string, content: string): UpdateComponentAction => ({
  type: 'UPDATE_COMPONENT',
  id,
  content
})

export const FocusComponent = (id: string): FocusComponentAction => ({
  type: 'FOCUS_COMPONENT',
  id
})

export const CursorPosition = (x: number, y: number): CursorPositionAction => ({
  type: 'CURSOR_POSITION',
  x,
  y
})