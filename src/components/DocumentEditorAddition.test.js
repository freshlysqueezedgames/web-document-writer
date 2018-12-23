// @flow

import * as React from 'react'
import {shallow, mount, type ShallowWrapper, type ReactWrapper} from 'enzyme'

import DocumentEditorAddition from './DocumentEditorAddition'
import KEY_CODE from '../utils'

describe('<DocumentEditorAddition/>', (): void => {
  test('Should be able to take input text from state', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentEditorAddition/>)

    wrapper.setState({value: 'test'})

    let input: ShallowWrapper = wrapper.find('.document-editor-addition')

    expect(input).toHaveLength(1)

    input.simulate('change')
    input.simulate('keydown', {keyCode : 0})

    expect(input.props().value).toEqual('test')
  })

  test('Should submit it\'s entry and return to empty string when return is hit', (): void => {
    const onAdditionMock: JestMockFn<$ReadOnlyArray<string>, void> = jest.fn()
    const wrapper: ReactWrapper = mount(<DocumentEditorAddition OnAddition={onAdditionMock}/>)

    wrapper.setState({value: 'test'})

    let input: ReactWrapper = wrapper.find('.document-editor-addition')

    expect(input).toHaveLength(1)

    input.simulate('change')
    input.simulate('keydown', {keyCode: KEY_CODE.RETURN})

    input = wrapper.find('.document-editor-addition')

    expect(input).toHaveLength(1)
    expect(input.props().value).toEqual('')

    expect(onAdditionMock).toHaveBeenCalledTimes(1)
    expect(onAdditionMock).toHaveBeenCalledWith('test')
  })
})