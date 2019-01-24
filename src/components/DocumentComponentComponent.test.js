// @flow

import * as React from 'react'
import {shallow, mount, type ShallowWrapper, type ReactWrapper} from 'enzyme'

import {DOCUMENT_COMPONENT_TYPE} from '../store/types'

import DocumentComponentComponent, {type Range} from './DocumentComponentComponent'
import KEY_CODE from '../utils'

describe('<DocumentComponentComponent/>', (): void => {
  test('Should render the content of document component state', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentComponentComponent id="test id" content="This is the content" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} focused={true}/>)

    const element: ShallowWrapper = wrapper.find('.document-component-component')

    expect(element).toHaveLength(1)
    expect(element.find('textarea').props().value).toEqual('This is the content')
  })

  test('Should trigger a change whenever the value is updated', (): void => {
    const contentChangeMock: JestMockFn<$ReadOnlyArray<string>, void> = jest.fn()
    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test" content="This is the content"  componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} focused={true} OnContentChange={contentChangeMock} />)

    const textArea: ReactWrapper = wrapper.find('textarea')

    expect(textArea).toHaveLength(1)

    textArea.simulate('change')

    expect(contentChangeMock).toHaveBeenCalledTimes(1)
    expect(contentChangeMock).toHaveBeenCalledWith('test', 'This is the content')
  })

  test('Should have an area that reflects the content in textarea', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentComponentComponent id="test" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} content="This is the content" focused={true}/>)
    const content: ShallowWrapper = wrapper.find('.document-component-component__content')
    const textArea: ShallowWrapper = wrapper.find('textarea')
    
    expect(content.text()).toEqual(textArea.props().value)
  })

  test('Should focus on the clicked position in the textarea when the content is clicked', (): void => {
    const getSelection: () => Selection = window.getSelection
    
    window.getSelection = jest.fn().mockImplementation((): {getRangeAt: () => Range, rangeCount: number} => ({
      getRangeAt: (): Range => ({
        startOffset: 5,
        endOffset: 5
      }),
      rangeCount: 1
    }))

    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test"  componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} content="This is the content" focused={true}/>)
    const content: ReactWrapper = wrapper.find('.document-component-component__content')

    content.simulate('click')

    const textarea: ReactWrapper = wrapper.find('textarea')

    expect(textarea).toHaveLength(1)

    const node: HTMLElement | HTMLInputElement = textarea.getDOMNode()

    if (!(node instanceof HTMLTextAreaElement)) {
      throw new Error('input type not returned')
    }

    expect(node.selectionStart).toEqual(5)
    expect(node.selectionEnd).toEqual(5)

    window.getSelection = getSelection
  })

  test('Should have a default range of 0, 0 if the selection range is not available', () => {
    const getSelection: () => Selection = window.getSelection
    
    window.getSelection = jest.fn().mockImplementation((): {rangeCount: number} => ({
      rangeCount: 0
    }))

    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test"  componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} content="This is the content" focused={true}/>)
    const content: ReactWrapper = wrapper.find('.document-component-component__content')

    content.simulate('click')

    const textarea: ReactWrapper = wrapper.find('textarea')

    expect(textarea).toHaveLength(1)

    const node: HTMLElement | HTMLInputElement = textarea.getDOMNode()

    if (!(node instanceof HTMLTextAreaElement)) {
      throw new Error('input type not returned')
    }

    expect(node.selectionStart).toEqual(0)
    expect(node.selectionEnd).toEqual(0)

    window.getSelection = getSelection    
  })

  test('Should trigger the creation of a new component whenever ctrl+return is pressed', (): void => {
    const additionMock: JestMockFn<$ReadOnlyArray<string>, void> = jest.fn() 
    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} content="this is the content" focused={true} OnContentAddition={additionMock}/>)

    const textarea: ReactWrapper = wrapper.find('textarea')

    expect(textarea).toHaveLength(1)

    textarea.simulate('keydown', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(additionMock).toHaveBeenCalledTimes(1)
    expect(additionMock).toHaveBeenCalledWith('test', '')
  })

  test('Should not trigger a change using return if ctrl is not pressed', (): void => {
    const additionMock: JestMockFn<$ReadOnlyArray<string>, void> = jest.fn() 
    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} content="this is the content" focused={true} OnContentAddition={additionMock}/>)

    const textarea: ReactWrapper = wrapper.find('textarea')

    expect(textarea).toHaveLength(1)

    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(additionMock).toHaveBeenCalledTimes(0)

    textarea.simulate('keydown', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(additionMock).toHaveBeenCalledTimes(1)
    expect(additionMock).toHaveBeenCalledWith('test', '')

    textarea.simulate('keyup', {keyCode: KEY_CODE.CTRL})
    textarea.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    expect(additionMock).toHaveBeenCalledTimes(1)
  })
})