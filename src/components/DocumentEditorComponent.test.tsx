// @flow

import * as React from 'react'
import {mount, ReactWrapper} from 'enzyme'

import {Provider} from 'react-redux'
import {store, GetDocument, SetDocument} from '../store'

import {DOCUMENT_COMPONENT_TYPE, DROP_MODE} from '../store/types'
import {DragTarget} from './DragAndDrop'
import {DRAG_IDENTIFIER} from './DocumentComponentComponent'

import DocumentEditorComponent from './DocumentEditorComponent'
import KEY_CODE from '../utils'

import * as styles from './DocumentEditorComponent.scss'
import * as componentStyles from './DocumentComponentComponent.scss'
import * as buttonStyles from './Buttons.scss'

jest.useFakeTimers()

describe('<DocumentEditorComponent/>', (): void => {
  let keyMapStyles = styles as {[key: string]: string}

  test('Should render the title and slug of the project', (): void => {
    SetDocument('test-document', [])

    const wrapper: ReactWrapper = mount(<Provider store={store}>
      <DocumentEditorComponent/>
    </Provider>)

    expect(wrapper.find(`.${styles.documentEditorComponent}`)).toHaveLength(1)
  })

  test('Should be able to render a list of document component components for its content', () => {
    SetDocument('test', [{
      content: 'test1',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }, {
      content: 'test2',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(<Provider store={store}>
      <DocumentEditorComponent/>
    </Provider>)

    expect(wrapper.find(`.${keyMapStyles.documentComponentComponent}`)).toHaveLength(2)
  })

  test('Should append new DocumentComponentComponent\'s when ctrl+return is used within a DocumentComponentComponent', (): void => {
    SetDocument('test-document', [{
      content: 'test1',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const textarea: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentComponent} textarea`)

    expect(textarea).toHaveLength(1)

    textarea.simulate('keydown', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(wrapper.find(`.${keyMapStyles.documentComponentComponent}`)).toHaveLength(2)
  })

  test('Should prepend new DocumentComponentComponent\'s when ctrl+shift+return is used within a DocumentComponentComponent', (): void => {
    SetDocument('test-document', [{
      content: 'test1',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const textarea: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentComponent} textarea`)

    expect(textarea).toHaveLength(1)

    textarea.simulate('keydown', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.SHIFT})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(wrapper.find(`.${keyMapStyles.documentComponentComponent}`)).toHaveLength(2)
  })

  test('Should update the content within a component when the user makes a change to the text', (): void => {
    SetDocument('test-document', [{
      content: '',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const textarea: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentComponent} textarea`)

    expect(textarea).toHaveLength(1) 

    const instance = textarea.instance() as {[key: string]: any}

    instance.value = 'test'
    textarea.simulate('change')

    expect(wrapper.find(`.${keyMapStyles.componentType}`).text()).toEqual('test')
  })

  test('Should be able to focus into a particular DocumentComponentComponent', (): void => {
    SetDocument('test-document', [{
      content: '',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const content: ReactWrapper = wrapper.find(`.${keyMapStyles.componentType}`)

    expect(content).toHaveLength(1)

    const getSelection = window.getSelection
    
    window.getSelection = jest.fn().mockImplementation((): {rangeCount: number} => ({
      rangeCount: 0
    }))

    content.simulate('click')

    const textarea: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentComponent} textarea`)

    expect(textarea).toHaveLength(1)

    expect(textarea.instance()).toEqual(document.activeElement)
    
    window.getSelection = getSelection
  })

  test('Should update a components type when the component type has been modified', (): void => {
    SetDocument('test-document', [{
      content: '',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const getSelection = window.getSelection
    
    window.getSelection = jest.fn().mockImplementation((): {rangeCount: number} => ({
      rangeCount: 0
    }))

    let component: ReactWrapper = wrapper.find(`.${componentStyles.componentType}`)

    expect(component).toHaveLength(1)

    component.simulate('click')

    const buttons: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentTypeSelection} .${keyMapStyles.button}`)

    expect(buttons).toHaveLength(5)

    const h1Button: ReactWrapper = buttons.first()

    h1Button.simulate('click')

    component = wrapper.find('DocumentComponentComponent')

    expect(component).toHaveLength(1)

    expect(component.prop('componentType')).toEqual(DOCUMENT_COMPONENT_TYPE.HEADER_1)
  
    window.getSelection = getSelection
  })

  test('Should be able to remove a component', (): void => {
    SetDocument('test-document', [{
      content: '',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    let component: ReactWrapper = wrapper.find('DocumentComponentComponent')

    expect(component).toHaveLength(1)

    const removeButton: ReactWrapper = component.find(`div.${componentStyles.remove} div.${buttonStyles.remove}`)

    expect(removeButton).toHaveLength(1)
    removeButton.simulate('mousedown')

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1200)

    jest.runAllTimers()

    expect(store.getState().toJS().document.components).toHaveLength(0)
  })

  test('Should be able to cancel removal of component', (): void => {
    SetDocument('test-document', [{
      content: '',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    let component: ReactWrapper = wrapper.find('DocumentComponentComponent')

    expect(component).toHaveLength(1)

    const removeButton: ReactWrapper = component.find(`div.${componentStyles.remove} div.${buttonStyles.remove}`)

    expect(removeButton).toHaveLength(1)
    removeButton.simulate('mousedown')

    expect(setTimeout).toHaveBeenCalledTimes(2)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1200)

    jest.runTimersToTime(600)

    removeButton.simulate('mouseup')

    jest.runTimersToTime(600)
    
    expect(store.getState().toJS().document.components).toHaveLength(1)
  })

  test('Should be able to drag append and prepend components based on the position of the mouse', (): void => {
    DragTarget(DRAG_IDENTIFIER)

    SetDocument('test-document', [{
      content: 'some more content',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }, {
      content: 'some more content',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    let component: ReactWrapper = wrapper.find(`.${componentStyles.documentComponentComponent}`)
    let dragButton: ReactWrapper = component.at(0).find(`.${componentStyles.drag}`)

    expect(component).toHaveLength(2)

    dragButton.simulate('mousedown')
    component.at(1).simulate('dragover')
    component.at(0).simulate('dragend')

    let state = GetDocument()
    
    expect(state).toHaveLength(2)

    expect(state).toMatchObject([{
      content: 'some more content',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }, {
      content: 'some more content',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])

    component = wrapper.find(`.${componentStyles.documentComponentComponent}`)

    dragButton = component.at(1).find(`.${componentStyles.drag}`)

    dragButton.simulate('mousedown')
    component.at(0).simulate('dragover', {clientY: -10})
    component.at(1).simulate('dragend')
    
    state = GetDocument()

    expect(state).toMatchObject([{
      content: 'some more content',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }, {
      content: 'some more content',
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }])
  })
})
