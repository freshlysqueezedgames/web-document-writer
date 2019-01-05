// @flow

import {
  CursorReducer, 
  DocumentReducer,

  defaultDocumentStateRecord,
  defaultCursorStateRecord
} from './index'

describe('CursorReducer', (): void => {
  test('Should return default state if action provided requires no reduction', (): void => {
    expect(defaultCursorStateRecord.toJS()).toMatchObject(CursorReducer(undefined, {type: 'EMPTY'}).toJS())
  })
})

describe('DocumentReducer', (): void => {
  test('Should return default state if action provided requires no reduction', (): void => {
    expect(defaultDocumentStateRecord.toJS()).toMatchObject(DocumentReducer(undefined, {type: 'EMPTY'}).toJS())
  })
})