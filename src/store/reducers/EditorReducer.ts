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

const undoQueue: Array<EditorStateRecord> = []
let redoQueue: Array<EditorStateRecord> = []

const maxLength = 20

const EditorReducer = (state: EditorStateRecord = defaultEditorStateRecord, action: Action): EditorStateRecord => {
  const originalState = state

  switch (action.type) {
    case 'UPDATE_CURSOR':
    case 'UPDATE_CURSOR_OFFSETS': {
      state = state.update<"cursor">('cursor', (record: CursorStateRecord): CursorStateRecord => CursorReducer(record, action))
    }
    case 'SET_DOCUMENT':
    case 'PREPEND_COMPONENT':
    case 'APPEND_COMPONENT':
    case 'UPDATE_COMPONENT':
    case 'UPDATE_COMPONENT_TYPE':
    case 'UPDATE_HIGHLIGHT_TYPE':
    case 'REMOVE_HIGHLIGHT_TYPE':
    case 'DELETE_HIGHLIGHT':
    case 'FOCUS_COMPONENT':
    case 'REMOVE_COMPONENT':
    case 'MOVE_COMPONENT_ACTION':
    case 'MOVE_TARGET_COMPONENT_ACTION':
    case 'HIGHLIGHT_RANGE': {
      state = state.update<"document">('document', (record: DocumentStateRecord): DocumentStateRecord => DocumentReducer(record, action))
    }
    case 'UNDO': {
      if (!undoQueue.length) {
        return state
      }

      redoQueue.unshift(state)

      if (redoQueue.length >= maxLength) {
        redoQueue.pop()
      }

      return <EditorStateRecord>undoQueue.pop()
    }
    case 'REDO': {
      if (!redoQueue.length) {
        return state
      }

      undoQueue.push(state)

      if (undoQueue.length >= maxLength) {
        undoQueue.shift()
      }

      return <EditorStateRecord>redoQueue.shift()
    }
  }

  if (state !== originalState) {
    undoQueue.push(state)

    if (undoQueue.length > maxLength) { // we need to remove the earliest undoQueue member if the length is greater than the max length
      undoQueue.unshift()
    }

    if (redoQueue.length) { // we need to empty the redo queue now as they have taken a new path
      redoQueue = []
    }
  }

  return state
}

export default EditorReducer