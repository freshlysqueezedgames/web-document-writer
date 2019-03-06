// @flow

import CursorReducer, {
  defaultCursorStateRecord
} from './CursorReducer'

describe('CursorReducer', (): void => {
  test('Should return default state if action provided requires no reduction', (): void => {
    expect(defaultCursorStateRecord.toJS()).toMatchObject(CursorReducer(undefined, {type: 'EMPTY'}).toJS())
  })
})