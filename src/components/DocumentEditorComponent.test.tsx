// @flow

import * as React from 'react'
import {mount, ReactWrapper} from 'enzyme'

import {Provider} from 'react-redux'
import {store} from '../store'

import {SetDocument} from '../store/actions'
import {DOCUMENT_COMPONENT_TYPE} from '../store/types'

import DocumentEditorComponent from './DocumentEditorComponent'
import KEY_CODE from '../utils'

import * as styles from './DocumentEditorComponent.scss'

describe('<DocumentEditorComponent/>', (): void => {
  let keyMapStyles = styles as {[key: string]: string}

  test('Should render the title and slug of the project', (): void => {
    store.dispatch(SetDocument('test-document', []))

    const wrapper: ReactWrapper = mount(<Provider store={store}>
      <DocumentEditorComponent/>
    </Provider>)

    expect(wrapper.find(`.${styles.documentEditorComponent}`)).toHaveLength(1)
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

    expect(wrapper.find(`.${keyMapStyles.documentComponentComponent}`)).toHaveLength(2)
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

    const textarea: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentComponent} textarea`)

    expect(textarea).toHaveLength(1)

    textarea.simulate('keydown', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(wrapper.find(`.${keyMapStyles.documentComponentComponent}`)).toHaveLength(2)
  })

  test('Should prepend new DocumentComponentComponent\'s when ctrl+shift+return is used within a DocumentComponentComponent', (): void => {
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

    const textarea: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentComponent} textarea`)

    expect(textarea).toHaveLength(1)

    textarea.simulate('keydown', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.SHIFT})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(wrapper.find(`.${keyMapStyles.documentComponentComponent}`)).toHaveLength(2)
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

    const textarea: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentComponent} textarea`)

    expect(textarea).toHaveLength(1) 

    const instance = textarea.instance() as {[key: string]: any}

    instance.value = 'test'
    textarea.simulate('change')

    expect(wrapper.find(`.${keyMapStyles.componentType}`).text()).toEqual('test')
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

    const content: ReactWrapper = wrapper.find(`.${keyMapStyles.componentType}`)

    expect(content).toHaveLength(1)

    const getSelection: () => Selection = window.getSelection
    
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

    const buttons: ReactWrapper = wrapper.find(`.${keyMapStyles.documentComponentTypeSelection} .${keyMapStyles.button}`)

    expect(buttons).toHaveLength(5)

    const h1Button: ReactWrapper = buttons.first()

    h1Button.simulate('click')

    const component: ReactWrapper = wrapper.find('DocumentComponentComponent')

    expect(component).toHaveLength(1)

    expect(component.prop('componentType')).toEqual(DOCUMENT_COMPONENT_TYPE.HEADER_1)
  })
})
