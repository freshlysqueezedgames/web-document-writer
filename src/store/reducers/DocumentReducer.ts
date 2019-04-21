// @flow

import {Record, List, RecordOf} from 'immutable'
import {Action} from '../actions'
import HighlightsReducer, { HighlightRecordFactory } from './HighlightsReducer'

import {
  DOCUMENT_COMPONENT_TYPE,
  DocumentComponentState,
  DocumentStateRecord,
  DocumentComponentStateRecord,
  DROP_MODE,
  Highlight,
  DocumentComponentConfig
} from '../types'

import shortid from 'shortid'

const DocumentComponentStateFactory = Record({
  id: '',
  content: '',
  focused: false,
  drop: DROP_MODE.NONE,
  componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH,
  highlights: List<RecordOf<Highlight>>()
})

const DocumentStateFactory = Record({
  slug: 'default-slug',
  components: List()
})

function SetBoolByID (id: string, list: List<DocumentComponentStateRecord>, key: keyof DocumentComponentState = 'focused'): List<DocumentComponentStateRecord> {
  return list.map((record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set(key, id === record.get('id')))
}

export const defaultDocumentStateRecord: DocumentStateRecord = DocumentStateFactory()

const DocumentReducer = (state: DocumentStateRecord = defaultDocumentStateRecord, action: Action): DocumentStateRecord => {
  switch (action.type) {
    case 'SET_DOCUMENT': {
      let content: DocumentComponentConfig[] = action.content
      
      if (!content || !content.length) {
        content = [{
          id: shortid.generate(),
          content: '',
          focused: false,
          drop: DROP_MODE.NONE,
          componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH,
          highlights: []
        }]
      }

      const mapped = content.map((state: DocumentComponentConfig): DocumentComponentStateRecord => {
        const highlights = List((state.highlights || []).map((highlight: Highlight) => HighlightRecordFactory(highlight)))

        return DocumentComponentStateFactory({...state, highlights: HighlightsReducer(highlights, action)})
      })

      return state.set('slug', action.slug).set('components', List(mapped))
    }
    case 'APPEND_COMPONENT': {
      const {after, id, content, focused, componentType} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const index: number = list.findIndex((record: DocumentComponentStateRecord): boolean => record.get('id') === after)

        if (focused) {
          list = SetBoolByID(id, list)
        }

        if (index === -1) {
          return list.push(DocumentComponentStateFactory({id, content, focused, componentType, drop: DROP_MODE.NONE}))
        }

        return list.splice(index + 1, 0, DocumentComponentStateFactory({id, content, focused, componentType, drop: DROP_MODE.NONE}))
      })
    }
    case 'PREPEND_COMPONENT': {
      const {before, id, content, focused, componentType} = action

      return state.update("components", (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const index: number = list.findIndex((record: DocumentComponentStateRecord): boolean => record.get("id") === before)

        if (focused) {
          list = SetBoolByID(id, list)
        }

        if (index === -1) {
          return list.unshift(DocumentComponentStateFactory({id, content, focused, componentType, drop: DROP_MODE.NONE}))
        }

        return list.splice(index, 0, DocumentComponentStateFactory({id, content, focused, componentType, drop: DROP_MODE.NONE}))
      })
    }
    case 'UPDATE_COMPONENT': {
      const {id, content} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const key: number | void = list.findKey((value: DocumentComponentStateRecord) => value.get('id') === id)

        if (key === undefined) {
          return list
        }

        return list.update(key, (record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set('content', content))
      })
    }
    case 'UPDATE_COMPONENT_TYPE': {
      const {componentType} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const key: number | typeof undefined = list.findKey((record: DocumentComponentStateRecord): boolean => record.get('focused'))

        if (key === undefined) {
          return list
        }

        return list.update(key, (record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set('componentType', componentType))
      })
    }
    case 'FOCUS_COMPONENT': {
      const {id} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        return SetBoolByID(id, list)
      })
    }
    case 'REMOVE_COMPONENT': {
      const {id} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const key: number | typeof undefined = list.findKey((record: DocumentComponentStateRecord): boolean => record.get('id') === id)

        if (key === undefined) {
          return list
        }

        list = list.remove(key)

        if (list.count() < 1) {
          return list.push(DocumentComponentStateFactory({
            id: shortid.generate(),
            content: '',
            focused: false,
            drop: DROP_MODE.NONE,
            componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
          }))
        }

        return list
      })
    }
    case 'MOVE_TARGET_COMPONENT_ACTION': {
      const {id, mode} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        return list.map((record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set('drop', id === record.get('id') ? mode : DROP_MODE.NONE))
      })
    }
    case 'MOVE_COMPONENT_ACTION': {
      const {id} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        let targetKey: number | typeof undefined = list.findKey((record: DocumentComponentStateRecord): boolean => record.get('drop') !== DROP_MODE.NONE)
        const key: number | typeof undefined = list.findKey((record: DocumentComponentStateRecord): boolean => record.get('id') === id)

        if (targetKey === undefined || key === undefined || key === targetKey) {
          return list
        }

        const value: RecordOf<DocumentComponentState> = <RecordOf<DocumentComponentState>>list.get(key)

        list = list.splice(key, 1)

        targetKey = <number>list.findKey((record: DocumentComponentStateRecord): boolean => record.get('drop') !== DROP_MODE.NONE)

        list = list.splice((<RecordOf<DocumentComponentState>>list.get(targetKey)).drop === DROP_MODE.APPEND ? targetKey : targetKey + 1, 0, value)

        return list.map((record: DocumentComponentStateRecord): DocumentComponentStateRecord => record.set('drop', DROP_MODE.NONE))
      })
    }
    case 'HIGHLIGHT_RANGE': {
      const {id} = action

      return state.update('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        const key: number | typeof undefined = list.findKey((record: DocumentComponentStateRecord): boolean => record.get('id') === id)

        if (key === undefined) {
          return list
        }
        
        const record = <DocumentComponentStateRecord>list.get(key)

        return list.setIn([key, 'highlights'], HighlightsReducer(record.get('highlights'), action))
      })
    }
    default: {
      return state
    }
  }
}

export default DocumentReducer