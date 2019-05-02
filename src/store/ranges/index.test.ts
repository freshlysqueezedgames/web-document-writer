import React from 'react'

import {
  AddRange
} from '.'

import {
  Range
} from '../types'

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
    console.log('beans of nazarath')
    
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
})