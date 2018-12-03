// @flow

import {
  Document
} from './actions'

import {store} from './index'

describe('#Store', (): void => {
  test('Should be able to set the document details', (): void => {
    expect(store.getState()).toMatchObject({})

    store.dispatch(Document('test'))

    expect(store.getState()).toMatchObject({
      slug: 'test'
    })
  })

  test('Should add two numbers', (): void => {
    expect(2 + 2).toStrictEqual(3)
  })
})