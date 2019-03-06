// @flow
import {Record, RecordOf} from 'immutable'
import {Action} from '../actions'
import {EditorState, DocumentStateRecord, CursorStateRecord} from '../types'

import DocumentReducer, {defaultDocumentStateRecord} from './DocumentReducer'
import CursorReducer, {defaultCursorStateRecord} from './CursorReducer'

export type EditorStateRecord = RecordOf<EditorState>

const defaultEditorStateRecord: EditorStateRecord = Record({
  cursor: defaultCursorStateRecord,
  document: defaultDocumentStateRecord
})()

const EditorReducer = (state: EditorStateRecord = defaultEditorStateRecord, action: Action): EditorStateRecord => {
  switch (action.type) {
    case 'UPDATE_CURSOR': {
      return state.update<"cursor">('cursor', (record: CursorStateRecord): CursorStateRecord => CursorReducer(record, action))
    }
    case 'SET_DOCUMENT':
    case 'APPEND_COMPONENT':
    case 'UPDATE_COMPONENT':
    case 'UPDATE_COMPONENT_TYPE':
    case 'FOCUS_COMPONENT': {
      return state.update<"document">('document', (record: DocumentStateRecord): DocumentStateRecord => DocumentReducer(record, action))
    }
    default: {
      return state
    }
  }
}

export default EditorReducer