// @flow

import {
  type Action
} from '../actions'

export type DocumentState = $ReadOnly<{
  slug: string
}>

const defaultReducerState: DocumentState = {
  slug: 'default-slug'
}

export const DocumentReducer = (state: DocumentState = defaultReducerState, action: Action): DocumentState => {
  switch (action.type) {
    case 'DOCUMENT': {
      return {
        slug: action.slug
      }
    }
    default: {
      return state
    }
  }
}