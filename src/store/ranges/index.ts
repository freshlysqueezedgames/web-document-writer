import {Range} from '../types'

export interface Indices {
  from: number,
  length: number
}

export const RangeIndices = <T extends Range>(ranges: T[], insert: T): Indices => {
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
  let i = list.length

  while (i--) {
    let record = list[i]
    let start = record.start
    let end = record.end

    if (start > index + difference) {
      start += difference
      end += difference
    } else if (start < index && ((difference > 0 && end + 1 >= index) || (difference < 0 && end > index))) {
      end += difference
    }

    if (end <= start || start < 0 || end < 0) {
      list.splice(i, 1)
      continue
    }

    record.start = start
    record.end = end
  }

  return list
}

export const RemoveRanges = <T extends Range>(list: T[], start: number, end: number, condition: (item: T) => boolean): T[] => {
  let i: number = list.length

  if (start === end) {
    return list
  }

  while (i--) {
    const range: T = list[i]
    
    if (range.end < start) { // we are at the end, exit
      break
    }

    if (range.start > end) { // we haven't found a range inside the one specified yet
      continue
    }

    if (!condition(range)) { // this is not a removable item
      continue
    }

    if (range.end <= end && range.start >= start) { // this is within range and can be removed
      list.splice(i, 1)
      continue
    }

    if (range.end > end && range.start < start) { // this has been split, create ranges either side
      list.splice(i, 0, {...range, end: start})
      range.start = end
      continue
    }

    if (range.start < start) { // this has an overlap with the start, make end the range start
      range.end = start
      continue
    }

    range.start = end // only option left is there is an overlap with end, make the start the range end
  }

  return list
}