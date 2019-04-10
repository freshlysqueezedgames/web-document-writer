// @flow

import * as Redux from 'redux'
import {createStore} from 'redux'

import EditorReducer from './reducers/EditorReducer'
import {DocumentComponentDefinition, DocumentComponentState, DROP_MODE} from './types'
import {SetDocument as SetDocumentAction} from './actions'
import shortid from 'shortid'

export const store: Redux.Store = createStore(EditorReducer)

export function SetDocument (name: string, document: Array<DocumentComponentDefinition>) {
  const map: Array<DocumentComponentState> = document.map((state: DocumentComponentDefinition): DocumentComponentState => ({
    ...state,
    id: shortid.generate(),
    focused: false,
    drop: DROP_MODE.NONE
  }))

  store.dispatch(SetDocumentAction(name, map))
}

export function GetDocument (): Array<DocumentComponentDefinition> {
  const state = store.getState().toJS()

  return state.document.components.map((state: DocumentComponentState) => ({
    content: state.content,
    componentType: state.componentType
  }))
}