// @flow

import * as React from 'react'
import {mount, type ReactWrapper} from 'enzyme'

import {Provider} from 'react-redux'
import {store} from '../store'

import {SetDocument} from '../store/actions'
import {DOCUMENT_COMPONENT_TYPE} from '../store/types'

import DocumentEditorComponent from './DocumentEditorComponent'
import KEY_CODE from '../utils'


describe('<DocumentEditorComponent/>', (): void => {
  test('Should render the title and slug of the project', (): void => {
    store.dispatch(SetDocument('test-document', []))

    const wrapper: ReactWrapper = mount(<Provider store={store}>
      <DocumentEditorComponent/>
    </Provider>)

    expect(wrapper.find('.document-editor-component')).toHaveLength(1)
  })

  test('Should be able to render a list of document component components for its content', () => {
    store.dispatch(SetDocument('test', [{
      id: 'test1',
      content: 'test1',
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }, {
      id: 'test2',
      content: 'test2',
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }]))

    const wrapper: ReactWrapper = mount(<Provider store={store}>
      <DocumentEditorComponent/>
    </Provider>)

    expect(wrapper.find('.document-component-component')).toHaveLength(2)
  })

  test('Should append new DocumentComponentComponent\'s when ctrl+return is used within a DocumentComponentComponent', (): void => {
    store.dispatch(SetDocument('test-document', [{
      id: 'test1',
      content: 'test1',
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }]))

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const textarea: ReactWrapper = wrapper.find('.document-component-component textarea')

    expect(textarea).toHaveLength(1)

    textarea.simulate('keydown', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(wrapper.find('.document-component-component')).toHaveLength(2)
  })

  test('Should update the content within a component when the user makes a change to the text', (): void => {
    store.dispatch(SetDocument('test-document', [{
      id: 'test1',
      content: '',
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }]))

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const textarea: ReactWrapper = wrapper.find('.document-component-component textarea')

    expect(textarea).toHaveLength(1)

    textarea.instance().value = 'test'
    textarea.simulate('change')

    expect(wrapper.find('.document-component-component__content').text()).toEqual('test')
  })

  test('Should be able to focus into a particular DocumentComponentComponent', (): void => {
    store.dispatch(SetDocument('test-document', [{
      id: 'test1',
      content: '',
      focused: false,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }]))

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const content: ReactWrapper = wrapper.find('.document-component-component .document-component-component__content')

    expect(content).toHaveLength(1)

    const getSelection: () => Selection = window.getSelection
    
    window.getSelection = jest.fn().mockImplementation((): {rangeCount: number} => ({
      rangeCount: 0
    }))

    content.simulate('click')

    const textarea: ReactWrapper = wrapper.find('.document-component-component textarea')

    expect(textarea).toHaveLength(1)

    expect(textarea.instance()).toEqual(document.activeElement)
    
    window.getSelection = getSelection
  })

  test('Should update a components type when the component type has been modified', (): void => {
    store.dispatch(SetDocument('test-document', [{
      id: 'test1',
      content: '',
      focused: true,
      componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
    }]))

    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <DocumentEditorComponent/>
      </Provider>
    )

    const buttons: ReactWrapper = wrapper.find('.document-component-type-selection .button')

    expect(buttons).toHaveLength(5)

    const h1Button: ReactWrapper = buttons.first()

    h1Button.simulate('click')

    const component: ReactWrapper = wrapper.find('DocumentComponentComponent')

    expect(component).toHaveLength(1)

    expect(component.prop('componentType')).toEqual(DOCUMENT_COMPONENT_TYPE.HEADER_1)
  })
})
