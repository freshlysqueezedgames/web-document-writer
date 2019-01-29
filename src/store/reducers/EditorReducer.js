// @flow
import {Record, RecordInstance} from 'immutable'
import type {Action} from '../actions'
import type {EditorState} from '../types'

import DocumentReducer, {type DocumentStateRecord, defaultDocumentStateRecord} from './DocumentReducer'
import CursorReducer, {type CursorStateRecord, defaultCursorStateRecord} from './CursorReducer'

export type EditorStateRecord = RecordInstance<EditorState>

const defaultEditorStateRecord: EditorStateRecord = Record({
  cursor: defaultCursorStateRecord,
  document: defaultDocumentStateRecord
})()

const EditorReducer = (state: EditorStateRecord = defaultEditorStateRecord, action: Action): EditorStateRecord => {
  switch (action.type) {
    case 'UPDATE_CURSOR': {
      return state.update<CursorStateRecord>('cursor', (record: CursorStateRecord): CursorStateRecord => CursorReducer(record, action))
    }
    case 'SET_DOCUMENT':
    case 'APPEND_COMPONENT':
    case 'UPDATE_COMPONENT':
    case 'UPDATE_COMPONENT_TYPE':
    case 'FOCUS_COMPONENT': {
      return state.update<DocumentStateRecord>('document', (record: DocumentStateRecord): DocumentStateRecord => DocumentReducer(record, action))
    }
    default: {
      return state
    }
  }
}

export default EditorReducer