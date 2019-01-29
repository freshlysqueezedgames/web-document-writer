// @flow
import {Record, RecordInstance} from 'immutable'
import type {Action} from '../actions'

import type {
  CursorState
} from '../types'

export type CursorStateRecord = RecordInstance<CursorState> 

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