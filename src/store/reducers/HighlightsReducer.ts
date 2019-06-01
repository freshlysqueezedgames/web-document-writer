import { RecordOf, List, Record } from 'immutable'
import { Highlight, DOCUMENT_HIGHLIGHT_TYPE} from '../types'
import { Action } from '../actions'
import { AddRange, UpdateRanges} from '../ranges'

export type HighlightRecord = RecordOf<Highlight>

export const HighlightRecordFactory = Record<Highlight>({
  start: 0,
  end: 0,
  name: DOCUMENT_HIGHLIGHT_TYPE.BOLD
})

const HighlightsReducer = (state: List<HighlightRecord>, action: Action): List<HighlightRecord> => {
  switch (action.type) {
    case 'UPDATE_COMPONENT' : {
      const {index, difference} = action

      const l: number = state.count()
      let i: number = -1

      let list: Array<Highlight> = []

      while (++i < l) {
        list.push((<HighlightRecord>state.get(i)).toJS())
      }

      list = UpdateRanges(list, index, difference)

      return List<HighlightRecord>(list.map((item: Highlight) => HighlightRecordFactory(item)))
    }
    case 'UPDATE_HIGHLIGHT_TYPE': {
      const {highlightType, startOffset, endOffset} = action
      const list: Highlight[] = state.toJS()

      console.log(list, highlightType, startOffset, endOffset)

      return List(AddRange<Highlight>(list, {
        name: highlightType,
        start: startOffset,
        end: endOffset
      }).map((item: Highlight) => HighlightRecordFactory(item)))
    }
    default: {
      return state
    }
  }
}

export default HighlightsReducer