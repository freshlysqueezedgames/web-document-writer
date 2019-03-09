// @flow
import {
  SetDocument,
  AppendComponent,
  UpdateComponent,
  UpdateComponentType,
  FocusComponent,
  UpdateCursor
} from './actions'

import {
  DOCUMENT_COMPONENT_TYPE,
  EditorState
} from './types'

import {store} from './index'

describe('#Store', (): void => {
  test('Should be able to set the document details', (): void => {
    expect(store.getState().toJS().document).toMatchObject({})

    store.dispatch(SetDocument('test', []))

    expect(store.getState().toJS().document).toMatchObject({
      slug: 'test',
      components: []
    })
  })

  test('Should be able to set the initial state of the document', (): void => {
    store.dispatch(SetDocument('another test', [{
      id: 'test',
      content: 'this is a test',
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }]))

    expect(store.getState().toJS().document).toMatchObject({
      slug: 'another test',
      components: [{
        id: 'test',
        content: 'this is a test',
        focused: false
      }]
    })
  })

  const id = 'test'
  const content = 'testing the component'

  test('Should be able to add a component to the list of components', (): void => {
    store.dispatch(SetDocument('test', []))

    expect(store.getState().toJS().document).toMatchObject({
      slug: 'test',
      components: []
    })

    store.dispatch(AppendComponent('', id, content))

    expect(store.getState().toJS().document).toMatchObject({
      slug: 'test',
      components: [{id, content}]
    })
  })

  test('Should be able to append after a specific id', (): void => {
    store.dispatch(AppendComponent(id, 'test 2', 'This should be last'))
    store.dispatch(AppendComponent(id, 'test 3', 'This should be in the middle'))

    expect(store.getState().toJS().document).toMatchObject({
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
    store.dispatch(SetDocument('test', [{id, content, focused: false, componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH}]))

    expect(store.getState().toJS().document).toMatchObject({
      slug: 'test',
      components: [{content, id}]
    })

    const newValue = 'this is the next value'

    store.dispatch(UpdateComponent(id, newValue))

    expect(store.getState().toJS().document).toMatchObject({
      slug: 'test',
      components: [{id, content: newValue}]
    })
  })

  test('Should fail silently, with no updates if the targeted updated component does not exist', (): void => {
    store.dispatch(SetDocument('test', [{id, content, focused: false, componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH}]))

    const result: {slug: string; components: {id: string; content: string}[]} = {
      slug: 'test',
      components: [{content, id}]
    }

    expect(store.getState().toJS().document).toMatchObject(result)

    store.dispatch(UpdateComponent('non-existent id', 'some new value'))

    expect(store.getState().toJS().document).toMatchObject(result)
  })

  test('Should allow focus to be set on a component, making the other components lose their component flag', (): void => {
    store.dispatch(SetDocument('test', [{id, content, focused: true, componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH}, {id: 'test 2', content, focused: false, componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH}]))

    expect(store.getState().toJS().document.components).toMatchObject([{
      id,
      content,
      focused: true
    }, {
      id: 'test 2',
      content,
      focused: false
    }])

    store.dispatch(FocusComponent('test 2'))

    expect(store.getState().toJS().document.components).toMatchObject([{
      id,
      content,
      focused: false
    }, {
      id: 'test 2',
      content,
      focused: true
    }])
  })

  test('Appending a component should auto-focus to the new one', (): void => {
    store.dispatch(AppendComponent('test 2', 'test 3', 'this should be focused on'))

    expect(store.getState().toJS().document.components).toMatchObject([{
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

  test('Should be able to set the cursor position', (): void => {
    store.dispatch(UpdateCursor(10, 11, 20, 10))

    expect(store.getState().toJS().cursor).toMatchObject({
      top: 10,
      right: 11,
      bottom: 20,
      left: 10
    })
  })

  test('Should return default state if action provided requires no reduction', (): void => {
    const originalState: EditorState = store.getState().toJS()
    
    store.dispatch({'type': 'NOTHING_SPECIAL'})

    expect(store.getState().toJS()).toMatchObject(originalState)
  })

  test('Should be able to modify the component type', (): void => {
    store.dispatch(SetDocument('test', [{id, content, focused: true, componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH}]))

    expect(store.getState().toJS().document.components).toMatchObject([{
      id,
      content,
      focused: true,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    store.dispatch(UpdateComponentType(DOCUMENT_COMPONENT_TYPE.HEADER_1))

    expect(store.getState().toJS().document.components).toMatchObject([{
      id,
      content,
      focused: true,
      componentType: DOCUMENT_COMPONENT_TYPE.HEADER_1
    }])
  })

  test('Should fail silently if no matching component is found', (): void => {
    store.dispatch(SetDocument('test', [{id, content, focused: false, componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH}]))

    expect(store.getState().toJS().document.components).toMatchObject([{
      id,
      content,
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    store.dispatch(UpdateComponentType(DOCUMENT_COMPONENT_TYPE.HEADER_1))

    expect(store.getState().toJS().document.components).toMatchObject([{
      id,
      content,
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])
  })
})