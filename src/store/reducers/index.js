// @flow

import {
  type Action
} from '../actions'

export type DocumentComponentState = $ReadOnly<{
  id: string,
  content: string
}>

export type DocumentState = $ReadOnly<{
  slug: string,
  components: Array<DocumentComponentState>
}>

const defaultDocumentState: DocumentState = {
  slug: 'default-slug',
  components: []
}

export const DocumentReducer = (state: DocumentState = defaultDocumentState, action: Action): DocumentState => {
  switch (action.type) {
    case 'DOCUMENT': {
      return {
        ...state,
        slug: action.slug,
      }
    }
    case 'COMPONENT': {
      return {
        ...state,
        components : [...state.components, {
          id: action.id,
          content: action.content
        }]
      }
    }
    default: {
      return state
    }
  }
}