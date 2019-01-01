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

type DocumentActionCreator = (slug: string, content: DocumentComponentState[]) => DocumentAction
type AppendComponentActionCreator = (after: string, id: string, content: string, focused?: boolean) => AppendComponentAction
type UpdateComponentActionCreator = (id: string, content: string) => UpdateComponentAction
type FocusComponentActionCreator = (id: string) => FocusComponentAction

export type Action = DocumentAction | AppendComponentAction | UpdateComponentAction | FocusComponentAction

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