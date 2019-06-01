import {Range} from '../types'

export interface Indices {
  from: number,
  length: number
}

const RangeIndices = <T extends Range>(ranges: T[], insert: T): Indices => {
  let range: T | undefined
  let i: number = -1
  let from: number = -1
  const {start: startOffset, end: endOffset} = insert

  while((range = ranges[++i])) {
    const {start, end} = range

    if (startOffset >= end) { // this sits before the selection begins
      continue
    }

    if (start <= startOffset && end >= endOffset) { // this is larger and therefore BEFORE the selection
      continue
    }

    from === -1 ? from = i : null

    if (endOffset <= start) { // this sits after the selection and is therefore not of interest.
      break
    }
  }

  if (from === -1) {
    from = i
  }

  return {from, length: i - from}
}

const SplitRanges = <T extends Range>(ranges: T[], splitter: T, from: number, length: number): T[] => {
  const {start, end} = splitter

  if (start === end) { // no splitting is necessary if the range is empty
    return ranges
  }

  let i: number = -1
  let range: T | undefined

  const prepends: T[] = []
  const appends: T[] = []

  while ((range = ranges[++i])) {
    // any highlights that span across the startOffset need to be split into two across that range threshold
    if (range.start < start && range.end > start && range.end < end) {
      prepends.push({...range, end: start})
      range.start = start
      continue
    } 
    
    if (range.end > end && range.start < end && range.start > start) {
      appends.push({...range, end})
      range.start = end
    }
  }

  ranges.splice(from, 0, ...prepends)
  ranges.splice(from + length + prepends.length, 0, ...appends)

  return ranges
}

export const AddRange = <T extends Range>(ranges: T[], insert: T): T[] => {
  const {from, length} = RangeIndices<T>(ranges, insert)

  ranges.splice(from, 0, insert)

  // next we need to look at the ones that are affected and break them up into smaller segments to accommodate the new span
  SplitRanges<T>(ranges, insert, from, length)

  return ranges
}

export const UpdateRanges = <T extends Range>(list: T[], index: number, difference: number): T[] => {
  const l = list.length
  let i = -1

  while (++i < l) {
    let record = list[i]
    let start = record.start
    let end = record.end

    if (start > index + difference) {
      start += difference
      end += difference
    } else if (start < index && ((difference > 0 && end + 1 >= index) || (difference < 0 && end > index))) {
      end += difference
    }

    if (end <= start) {
      continue
    }

    record.start = start
    record.end = end
  }

  return list
}