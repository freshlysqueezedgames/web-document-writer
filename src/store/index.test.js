// @flow
import {
  Document,
  Component,
  UpdateComponent
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

  const id: string = 'test'
  const content: string = 'testing the component'

  test('Should be able to add a component to the list of components', (): void => {
    expect(store.getState().toJS()).toMatchObject({
      slug : 'test',
      components: []
    })

    store.dispatch(Component(id, content))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: [{id, content}]
    })
  })

  test('Should be able to modify the value of an item to a playlist', (): void => {
    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: [{content, id}]      
    })

    const newValue: string = 'this is the next value'

    store.dispatch(UpdateComponent(id, newValue))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: [{id, content: newValue}]
    })
  })

  
})