// @flow
import {Record} from 'immutable'
import {Action} from '../actions'

import {
  CursorState,
  CursorStateRecord
} from '../types'

const CursorStateFactory = Record({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  offsetElement: null
})

export const defaultCursorStateRecord: CursorStateRecord = CursorStateFactory()

const CursorReducer = (state: CursorStateRecord = defaultCursorStateRecord, action: Action): CursorStateRecord => {
  switch (action.type) {
    case 'UPDATE_CURSOR': {
      const {top, right, bottom, left} = action

      return state.merge({top, right, bottom, left})
    }
    case 'UPDATE_CURSOR_OFFSETS': {
      const {offsetElement} = action

      if (!offsetElement) {
        return state
      }

      return state.merge({offsetElement})
    }
    default: {
      return state
    }
  }
}

export default CursorReducer