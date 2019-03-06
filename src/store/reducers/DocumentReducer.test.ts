// @flow

import DocumentReducer, {
  defaultDocumentStateRecord
} from './DocumentReducer'

describe('DocumentReducer', (): void => {
  test('Should return default state if action provided requires no reduction', (): void => {
    expect(defaultDocumentStateRecord.toJS()).toMatchObject(DocumentReducer(undefined, {type: 'EMPTY'}).toJS())
  })
})