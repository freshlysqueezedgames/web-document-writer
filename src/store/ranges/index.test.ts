import React from 'react'

import {
  AddRange, RemoveRanges
} from '.'

import {
  Range
} from '../types'
import { endianness } from 'os';

describe('Ranges', () => {
  test('Should be able to add a new range in front of its child elements', () => {
    const ranges: Range[] = [{
      start: 10,
      end: 15
    }]

    AddRange<Range>(ranges, {start: 2, end: 20})

    expect(ranges).toMatchObject([{
      start: 2,
      end: 20
    }, {
      start: 10,
      end: 15
    }])
  })

  test('Should be able to split children if the span cuts across parent range thresholds', () => {
    const ranges: Range[] = [{
      start: 2,
      end: 8
    }, {
      start: 10,
      end: 20
    }, {
      start: 13,
      end: 18
    }]

    AddRange<Range>(ranges, {start: 8, end: 12})

    expect(ranges).toMatchObject([{
      start: 2,
      end: 8
    }, {
      start: 8,
      end: 12
    }, {
      start: 10,
      end: 12,
    }, {
      start: 12,
      end: 20
    }, {
      start: 13,
      end: 18
    }])
  })

  test('Should place empty ranges at their precise position', () => {
    const ranges: Range[] = [{
      start: 0,
      end: 8
    }, {
      start: 10,
      end: 15
    }]

    AddRange<Range>(ranges, {start: 0, end: 0})

    expect(ranges).toMatchObject([{
      start: 0,
      end: 8
    }, {
      start: 0,
      end: 0
    }, {
      start: 10,
      end: 15
    }])    
  })

  test('Should be able to append insertion at end of ranges', () => {
    const ranges: Range[] = [{
      start: 2,
      end: 8
    }, {
      start: 10,
      end: 20
    }, {
      start: 13,
      end: 18
    }]

    AddRange(ranges, {start: 42, end: 45})

    expect(ranges).toMatchObject([{
      start: 2,
      end: 8
    }, {
      start: 10,
      end: 20
    }, {
      start: 13,
      end: 18
    }, {
      start: 42,
      end: 45
    }])
  })

  test('Should be able to split children that span across the start index', () => {
    const ranges: Range[] = [{
      start: 2,
      end: 8
    }, {
      start: 10,
      end: 20
    }, {
      start: 13,
      end: 18
    }]

    AddRange(ranges, {start: 5, end: 12})

    expect(ranges).toMatchObject([{
      start: 2,
      end: 5
    }, {
      start: 5,
      end: 12
    }, {
      start: 5,
      end: 8
    }, {
      start: 10,
      end: 12
    }, {
      start: 12,
      end: 20
    }, {
      start: 13,
      end: 18
    }])
  })

  describe('Removing Ranges', () => {
    test('Should be able to remove a range from a list', () => {
      const ranges: Range[] = [{
        start: 2,
        end: 8
      }, {
        start: 10,
        end: 20
      }, {
        start: 30,
        end: 35
      }]
  
      RemoveRanges(ranges, 10, 20, () => true)
  
      expect(ranges).toMatchObject([{
        start: 2,
        end: 8
      }, {
        start: 30,
        end: 35
      }])
    })

    test('Should be able to remove any number of nested ranges', () => {
      const ranges: Range[] = [{
        start: 2,
        end: 8
      }, {
        start: 10,
        end: 20
      }, {
        start: 13,
        end: 18
      }]
  
      RemoveRanges(ranges, 10, 20, () => true)
  
      expect(ranges).toMatchObject([{
        start: 2,
        end: 8
      }])
    })

    test('Should be able to split ranges that overlap', () => {
      const ranges: Range[] = [{
        start: 2,
        end: 8
      }, {
        start: 10,
        end: 20
      }]
  
      RemoveRanges(ranges, 6, 12, () => true)
  
      expect(ranges).toMatchObject([{
        start: 2,
        end: 6
      }, {
        start: 12,
        end: 20
      }])
    })

    test('SHould be able to split a range that embodies the entire range and more', () => {
      const ranges: Range[] = [{
        start: 2,
        end: 10
      }]
  
      RemoveRanges(ranges, 4, 8, () => true)
  
      expect(ranges).toMatchObject([{
        start: 2,
        end: 4
      }, {
        start: 8,
        end: 10
      }])      
    })

    test('Should be able to remove based on a condition', () => {
      interface RangeWithValue extends Range {
        removeable: boolean
      }

      const ranges: RangeWithValue[] = [{
        start: 2,
        end: 8,
        removeable: true
      }, {
        start: 12,
        end: 20,
        removeable: false
      }, {
        start: 14,
        end: 18,
        removeable: true
      }]
  
      RemoveRanges<RangeWithValue>(ranges, 12, 20, (item: RangeWithValue) => item.removeable)
  
      expect(ranges).toMatchObject([{
        start: 2,
        end: 8,
        removeable: true
      }, {
        start: 12,
        end: 20,
        removeable: false
      }])
    })
  })
})