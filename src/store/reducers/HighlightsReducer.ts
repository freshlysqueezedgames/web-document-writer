import { RecordOf, List, Record } from 'immutable'
import { Highlight, DOCUMENT_HIGHLIGHT_TYPE } from '../types'
import { Action } from '../actions'

export type HighlightRecord = RecordOf<Highlight>

export const HighlightRecordFactory = Record<Highlight>({
  start: 0,
  end: 0,
  name: DOCUMENT_HIGHLIGHT_TYPE.BOLD
})

const HighlightsReducer = (state: List<HighlightRecord>, action: Action): List<HighlightRecord> => {
  switch (action.type) {
    case 'HIGHLIGHT_RANGE' : {
      return state.push(HighlightRecordFactory({start: action.start, end: action.end, name: action.name, options: action.options}))
    }
    default: {
      return state
    }
  }
}

export default HighlightsReducer