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

type DocumentActionCreator = (slug: string, content: DocumentComponentState[]) => DocumentAction
type AppendComponentActionCreator = (after: string, id: string, content: string, focused?: boolean) => AppendComponentAction
type UpdateComponentActionCreator = (id: string, content: string) => UpdateComponentAction
type FocusComponentActionCreator = (id: string) => FocusComponentAction
type CursorPositionActionCreator = (x: number, y: number) => CursorPositionAction

export type Action = DocumentAction | AppendComponentAction | UpdateComponentAction | FocusComponentAction | CursorPositionAction | {|type: 'EMPTY'|}

export const SetDocument: DocumentActionCreator = (slug: string, content: DocumentComponentState[]): DocumentAction => ({
  type: 'SET_DOCUMENT',
  slug,
  content
})

export const AppendComponent: AppendComponentActionCreator = (after: string, id: string, content: string, focused: boolean = true): AppendComponentAction => ({
  type: 'APPEND_COMPONENT',
  after,
  id,
  content,
  focused
})

export const UpdateComponent: UpdateComponentActionCreator = (id: string, content: string): UpdateComponentAction => ({
  type: 'UPDATE_COMPONENT',
  id,
  content
})

export const FocusComponent: FocusComponentActionCreator = (id: string): FocusComponentAction => ({
  type: 'FOCUS_COMPONENT',
  id
})

export const CursorPosition: CursorPositionActionCreator = (x: number, y: number): CursorPositionAction => ({
  type: 'CURSOR_POSITION',
  x,
  y
})