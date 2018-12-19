// @flow
import shortid from 'shortid'

import {
  Document,
  Component
} from './actions'

import {store} from './index'

describe('#Store', (): void => {
  test('Should be able to set the document details', (): void => {
    expect(store.getState().toJS()).toMatchObject({})

    store.dispatch(Document('test'))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: []
    })
  })

  test('Should be able to add a component to the list of components', (): void => {
    expect(store.getState().toJS()).toMatchObject({
      slug : 'test'
    })

    const id: string = shortid.generate()
    const content: string = 'testing the component'

    store.dispatch(Component(id, content))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: [{id, content}]
    })
  })
})