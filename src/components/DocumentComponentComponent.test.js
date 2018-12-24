// @flow

import * as React from 'react'
import {shallow, mount, type ShallowWrapper, type ReactWrapper} from 'enzyme'

import DocumentComponentComponent, {type Range} from './DocumentComponentComponent'

describe('<DocumentComponentComponent/>', (): void => {
  test('Should render the content of document component state', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentComponentComponent id="test id" content="This is the content" />)

    const element: ShallowWrapper = wrapper.find('.document-component-component')

    expect(element).toHaveLength(1)
    expect(element.find('textarea').props().value).toEqual('This is the content')
  })

  test('Should trigger a change whenever the value is updated', (): void => {
    const contentChangeMock: JestMockFn<$ReadOnlyArray<string>, void> = jest.fn()
    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test" content="This is the content" ComponentContentChange={contentChangeMock} />)

    const textArea: ReactWrapper = wrapper.find('textarea')

    expect(textArea).toHaveLength(1)

    textArea.simulate('change')

    expect(contentChangeMock).toHaveBeenCalledTimes(1)
    expect(contentChangeMock).toHaveBeenCalledWith('test', 'This is the content')
  })

  test('Should have an area that reflects the content in textarea', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentComponentComponent id="test" content="This is the content"/>)
    const content: ShallowWrapper = wrapper.find('.document-component-component__content')
    const textArea: ShallowWrapper = wrapper.find('textarea')
    
    expect(content.text()).toEqual(textArea.props().value)
  })

  test('Should focus on the clicked position in the textarea when the content is clicked', (): void => {
    const getSelection: () => Selection = window.getSelection
    
    window.getSelection = jest.fn().mockImplementation((): Selection => ({
      getRangeAt: (): Range => ({
        startOffset: 5,
        endOffset: 5
      }),
      rangeCount: 1
    }))

    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test" content="This is the content"/>)
    const content: ReactWrapper = wrapper.find('.document-component-component__content')

    content.simulate('click')

    const textarea: ReactWrapper = wrapper.find('textarea')

    expect(textarea).toHaveLength(1)
    expect(textarea.getDOMNode().selectionStart).toEqual(5)
    expect(textarea.getDOMNode().selectionEnd).toEqual(5)

    window.getSelection = getSelection
  })

  test('Should have a default range of 0, 0 if the selection range is not available', () => {
    const getSelection: () => Selection = window.getSelection
    
    window.getSelection = jest.fn().mockImplementation((): Selection => ({
      rangeCount: 0
    }))

    const wrapper: ReactWrapper = mount(<DocumentComponentComponent id="test" content="This is the content"/>)
    const content: ReactWrapper = wrapper.find('.document-component-component__content')

    content.simulate('click')

    const textarea: ReactWrapper = wrapper.find('textarea')

    expect(textarea).toHaveLength(1)
    expect(textarea.getDOMNode().selectionStart).toEqual(0)
    expect(textarea.getDOMNode().selectionEnd).toEqual(0)

    window.getSelection = getSelection    
  })
})