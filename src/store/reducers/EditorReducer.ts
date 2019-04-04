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
    case 'UPDATE_CURSOR':
    case 'UPDATE_CURSOR_OFFSETS': {
      return state.update<"cursor">('cursor', (record: CursorStateRecord): CursorStateRecord => CursorReducer(record, action))
    }
    case 'SET_DOCUMENT':
    case 'PREPEND_COMPONENT':
    case 'APPEND_COMPONENT':
    case 'UPDATE_COMPONENT':
    case 'UPDATE_COMPONENT_TYPE':
    case 'FOCUS_COMPONENT':
    case 'REMOVE_COMPONENT':
    case 'MOVE_COMPONENT_ACTION':
    case 'MOVE_TARGET_COMPONENT_ACTION': {
      return state.update<"document">('document', (record: DocumentStateRecord): DocumentStateRecord => DocumentReducer(record, action))
    }
    default: {
      return state
    }
  }
}

export default EditorReducer