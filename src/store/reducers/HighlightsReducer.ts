import { RecordOf, List, Record } from 'immutable'
import { Highlight, DOCUMENT_HIGHLIGHT_TYPE} from '../types'
import { Action } from '../actions'
import { AddRange, UpdateRanges, RemoveRanges} from '../ranges'
import shortid from 'shortid'

export type HighlightRecord = RecordOf<Highlight>

export const HighlightRecordFactory = Record<Highlight>({
  id: shortid.generate(),
  start: 0,
  end: 0,
  name: DOCUMENT_HIGHLIGHT_TYPE.BOLD,
  options: undefined
})

const HighlightsReducer = (state: List<HighlightRecord>, action: Action): List<HighlightRecord> => {
  switch (action.type) {
    case 'UPDATE_COMPONENT' : {
      const {index, difference} = action
      const list = UpdateRanges(state.toJS(), index, difference)

      return List<HighlightRecord>(list.map((item: Highlight) => HighlightRecordFactory(item)))
    }
    case 'UPDATE_HIGHLIGHT_TYPE': {
      const {highlightType, startOffset, endOffset, options} = action
      const list: Highlight[] = state.toJS()

      return List(AddRange<Highlight>(list, {
        id: shortid.generate(),
        name: highlightType,
        start: startOffset,
        end: endOffset,
        options
      })).map((item: Highlight) => HighlightRecordFactory(item))
    }
    case 'REMOVE_HIGHLIGHT_TYPE': {
      const {endOffset, startOffset} = action
      
      const list = RemoveRanges<Highlight>(state.toJS(), startOffset, endOffset, (highlight: Highlight): boolean => {
        return highlight.name === action.highlightType
      })

      return List<HighlightRecord>(list.map((item: Highlight) => HighlightRecordFactory(item)))
    }
    case 'DELETE_HIGHLIGHT': {
      const {id} = action
      const key = state.findIndex((record: RecordOf<Highlight>) => record.id === id)
    
      if (!key) {
        return state
      }

      return state.remove(key)
    }
    default: {
      return state
    }
  }
}

export default HighlightsReducer