// @flow
import {Record, RecordInstance} from 'immutable'
import type {Action} from '../actions'

import type {
  CursorState
} from '../types'

export type CursorStateRecord = RecordInstance<CursorState> 

const CursorStateFactory: (state?: CursorState) => CursorStateRecord = Record({
  x: 0,
  y: 0
})

export const defaultCursorStateRecord: CursorStateRecord = CursorStateFactory()

const CursorReducer = (state: CursorStateRecord = defaultCursorStateRecord, action: Action): CursorStateRecord => {
  switch (action.type) {
    case 'CURSOR_POSITION': {
      const {x, y} = action

      return state.set('x', x).set('y', y)
    }
    default: {
      return state
    }
  }
}

export default CursorReducer