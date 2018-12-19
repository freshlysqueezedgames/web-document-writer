// @flow

import {Record, RecordInstance, List} from 'immutable'

import {
  type Action
} from '../actions'

export type DocumentComponentState = {
  id: string,
  content: string
}

export type DocumentComponentStateRecord = RecordInstance<DocumentComponentState>

export type DocumentState = {
  slug: string,
  components: List<DocumentComponentState>
}

export type DocumentStateRecord = RecordInstance<DocumentState>

const defaultDocumentStateRecord: DocumentStateRecord = Record({
  slug: 'default-slug',
  components: List()
})()

const DocumentComponentStateFactory: (state: DocumentComponentState) => DocumentComponentStateRecord = Record({
  id: '',
  content: ''
})

export const DocumentReducer = (state: DocumentStateRecord = defaultDocumentStateRecord, action: Action): DocumentStateRecord => {
  switch (action.type) {
    case 'DOCUMENT': {
      return state.set('slug', action.slug)
    }
    case 'COMPONENT': {
      const {id, content} = action

      return state.update<List<DocumentComponentStateRecord>>('components', (list: List<DocumentComponentStateRecord>): List<DocumentComponentStateRecord> => {
        return list.push(DocumentComponentStateFactory({id, content}))
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
    default: {
      return state
    }
  }
}