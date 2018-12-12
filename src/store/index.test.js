// @flow
import shortid from 'shortid'

import {
  Document,
  Component
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

  test('Should be able to add a component to the list of components', (): void => {
    expect(store.getState()).toMatchObject({
      slug : 'test'
    })

    const id: string = shortid.generate()
    const content: string = 'testing the component'

    store.dispatch(Component(id, content))

    expect(store.getState()).toMatchObject({
      slug: 'test',
      components: [{id, content}]
    })
  })
})