// @flow
import {
  SetDocument,
  AppendComponent,
  UpdateComponent,
  FocusComponent
} from './actions'

import {store} from './index'

describe('#Store', (): void => {
  test('Should be able to set the document details', (): void => {
    expect(store.getState().toJS()).toMatchObject({})

    store.dispatch(SetDocument('test', []))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: []
    })
  })

  test('Should be able to set the initial state of the document', (): void => {
    store.dispatch(SetDocument('another test', [{
      id: 'test',
      content: 'this is a test',
      focused: false
    }]))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'another test',
      components: [{
        id: 'test',
        content: 'this is a test',
        focused: false
      }]
    })
  })

  const id: string = 'test'
  const content: string = 'testing the component'

  test('Should be able to add a component to the list of components', (): void => {
    store.dispatch(SetDocument('test', []))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: []
    })

    store.dispatch(AppendComponent('', id, content))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: [{id, content}]
    })
  })

  test('Should be able to append after a specific id', (): void => {
    store.dispatch(AppendComponent(id, 'test 2', 'This should be last'))
    store.dispatch(AppendComponent(id, 'test 3', 'This should be in the middle'))

    expect(store.getState().toJS()).toMatchObject({
      slug: 'test',
      components: [{
        id,
        content
      }, {
        id: 'test 3',
        content: 'This should be in the middle'
      }, {
        id: 'test 2',
        content: 'This should be last'
      }]
    })
  })

  test('Should be able to modify the value of an item to a playlist', (): void => {
    store.dispatch(SetDocument('test', [{id, content, focused: false}]))

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

  test('Should fail silently, with no updates if the targeted updated component does not exist', (): void => {
    store.dispatch(SetDocument('test', [{id, content, focused: false}]))

    const result: {slug: string, components: Array<{id: string, content: string}>} = {
      slug: 'test',
      components: [{content, id}]
    }

    expect(store.getState().toJS()).toMatchObject(result)

    store.dispatch(UpdateComponent('non-existent id', 'some new value'))

    expect(store.getState().toJS()).toMatchObject(result)
  })

  test('Should allow focus to be set on a component, making the other components lose their component flag', (): void => {
    store.dispatch(SetDocument('test', [{id, content, focused: true}, {id: 'test 2', content, focused: false}]))

    expect(store.getState().toJS().components).toMatchObject([{
      id,
      content,
      focused: true
    }, {
      id: 'test 2',
      content,
      focused: false
    }])

    store.dispatch(FocusComponent('test 2'))

    expect(store.getState().toJS().components).toMatchObject([{
      id,
      content,
      focused: false
    }, {
      id: 'test 2',
      content,
      focused: true
    }])
  })

  test('Appending a component should auto-focus to the new one', () => {
    store.dispatch(AppendComponent('test 2', 'test 3', 'this should be focused on'))

    expect(store.getState().toJS().components).toMatchObject([{
      id,
      content,
      focused: false
    }, {
      id: 'test 2',
      content,
      focused: false
    }, {
      id: 'test 3',
      content: 'this should be focused on',
      focused: true
    }])
  })
})