// @flow
import {
  DOCUMENT_COMPONENT_TYPE,
  type DocumentComponentType,
  type DocumentComponentState
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
  focused: boolean,
  componentType: DocumentComponentType
}

export type UpdateComponentAction = {
  type: 'UPDATE_COMPONENT',
  id: string,
  content: string
}

export type UpdateComponentTypeAction = {
  type: 'UPDATE_COMPONENT_TYPE',
  componentType: DocumentComponentType
}

export type FocusComponentAction = {
  type: 'FOCUS_COMPONENT',
  id: string
}

export type UpdateCursorAction = {
  type: 'UPDATE_CURSOR',
  top: number,
  right: number,
  bottom: number,
  left: number
}

export type Action = 
  DocumentAction | 
  AppendComponentAction | 
  UpdateComponentAction |
  UpdateComponentTypeAction | 
  FocusComponentAction | 
  UpdateCursorAction | 
  $Exact<{type: 'EMPTY'}>

export const SetDocument = (slug: string, content: DocumentComponentState[]): DocumentAction => ({
  type: 'SET_DOCUMENT',
  slug,
  content
})

export const AppendComponent = (after: string, id: string, content: string, focused: boolean = true, componentType: DocumentComponentType = DOCUMENT_COMPONENT_TYPE.PARAGRAPH): AppendComponentAction => ({
  type: 'APPEND_COMPONENT',
  after,
  id,
  content,
  focused,
  componentType
})

export const UpdateComponent = (id: string, content: string): UpdateComponentAction => ({
  type: 'UPDATE_COMPONENT',
  id,
  content
})

export const UpdateComponentType = (componentType: DocumentComponentType) => ({
  type: 'UPDATE_COMPONENT_TYPE',
  componentType
})

export const FocusComponent = (id: string): FocusComponentAction => ({
  type: 'FOCUS_COMPONENT',
  id
})

export const UpdateCursor = (top: number, right: number, bottom: number, left: number): UpdateCursorAction => ({
  type: 'UPDATE_CURSOR',
  top,
  right,
  bottom,
  left
})