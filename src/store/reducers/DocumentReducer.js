// @flow

import {Record, RecordInstance, List} from 'immutable'
import type {Action} from '../actions'

import {
  DOCUMENT_COMPONENT_TYPE,
  type DocumentState,
  type DocumentComponentState
} from '../types'

export type DocumentComponentStateRecord = RecordInstance<DocumentComponentState>
export type DocumentStateRecord = RecordInstance<DocumentState>

const DocumentComponentStateFactory: (state?: DocumentComponentState) => DocumentComponentStateRecord = Record({
  id: '',
  content: '',
  focused: false,
  componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
})

const DocumentStateFactory: (state?: DocumentState) => DocumentStateRecord = Record({
  slug: 'default-slug',
  components: List()
})

export const defaultDocumentStateRecord: DocumentStateRecord = DocumentStateFactory()

const DocumentReducer = (state: DocumentStateRecord = defaultDocumentStateRecord, action: Action): DocumentStateRecord => {
  switch (action.type) {
    case 'SET_DOCUMENT': {
      return state.set('slug', action.slug).set('components', List(action.content.map((state: DocumentComponentState): DocumentComponentStateRecord => DocumentComponentStateFactory(state))))
    }
    case 'APPEND_COMPONENT': {
      const {after, id, content, focused, componentType} = action

      return state.update<List<DocumentComponentStateRecord>>('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const index: number = list.findIndex((record: DocumentComponentStateRecord): boolean => record.get<string, string>('id') === after)

        if (focused) {
          list = SetFocusedByID(id, list)
        }

        if (index === -1) {
          return list.push(DocumentComponentStateFactory({id, content, focused, componentType}))
        }

        return list.splice(index + 1, 0, DocumentComponentStateFactory({id, content, focused, componentType}))
      })
    }
    case 'UPDATE_COMPONENT': {
      const {id, content} = action

      return state.update<List<DocumentComponentStateRecord>>('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const key: number | void = list.findKey((value: DocumentComponentStateRecord) => value.get<string, string>('id') === id)

        if (key === undefined) {
          return list
        }

        return list.update<DocumentComponentStateRecord>(key, (record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set('content', content))
      })
    }
    case 'UPDATE_COMPONENT_TYPE': {
      const {componentType} = action

      return state.update<List<DocumentComponentStateRecord>>('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const key: number | typeof undefined = list.findKey((record: DocumentComponentStateRecord): boolean => record.get<string, boolean>('focused'))

        if (key === undefined) {
          return list
        }

        return list.update<DocumentComponentStateRecord>(key, (record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set('componentType', componentType))
      })
    }
    case 'FOCUS_COMPONENT': {
      const {id} = action

      return state.update<List<DocumentComponentStateRecord>>('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        return SetFocusedByID(id, list)
      })
    }
    default: {
      return state
    }
  }
}

function SetFocusedByID (id: string, list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> {
  return list.map((record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set('focused', id === record.get('id')))
}

export default DocumentReducer