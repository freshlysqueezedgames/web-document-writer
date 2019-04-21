// @flow

import * as Redux from 'redux'
import {createStore} from 'redux'

import EditorReducer from './reducers/EditorReducer'
import {DocumentComponentDefinition, DocumentComponentConfig, DROP_MODE} from './types'
import {SetDocument as SetDocumentAction} from './actions'
import shortid from 'shortid'
import { List } from 'immutable'

export const store: Redux.Store = createStore(EditorReducer)

export function SetDocument (name: string, document: Array<DocumentComponentDefinition>) {
  const map: Array<DocumentComponentConfig> = document.map((state: DocumentComponentDefinition): DocumentComponentConfig => ({
    ...state,
    id: shortid.generate(),
    focused: false,
    drop: DROP_MODE.NONE
  }))

  console.log('this is the map', map)

  store.dispatch(SetDocumentAction(name, map))
}

export function GetDocument (): Array<DocumentComponentDefinition> {
  const state = store.getState().toJS()

  return state.document.components.map((state: DocumentComponentConfig) => ({
    content: state.content,
    componentType: state.componentType,
    highlights: state.highlights
  }))
}