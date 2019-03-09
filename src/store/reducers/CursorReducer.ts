// @flow
import {Record} from 'immutable'
import {Action} from '../actions'

import {
  CursorState,
  CursorStateRecord
} from '../types'

const CursorStateFactory: (state?: CursorState) => CursorStateRecord = Record({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
})

export const defaultCursorStateRecord: CursorStateRecord = CursorStateFactory()

const CursorReducer = (state: CursorStateRecord = defaultCursorStateRecord, action: Action): CursorStateRecord => {
  switch (action.type) {
    case 'UPDATE_CURSOR': {
      const {top, right, bottom, left} = action

      return state.merge({top, right, bottom, left})
    }
    default: {
      return state
    }
  }
}

export default CursorReducer