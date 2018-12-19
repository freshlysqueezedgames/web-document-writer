// @flow

import * as React from 'react'
import {shallow, type ShallowWrapper} from 'enzyme'

import DocumentEditorComponent, {DocumentComponentComponent} from '.'

describe('<DocumentEditorComponent/>', (): void => {
  test('Should render the title and slug of the project', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentEditorComponent slug="test" components={[]}/>)

    expect(wrapper.find('.document-editor-component')).toHaveLength(1)
  })
})

describe('<DocumentComponentComponent/>', (): void => {
  test('Should render the content of document component state', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentComponentComponent id="test id" content="This is the content"/>)

    const element: ShallowWrapper = wrapper.find('.document-component-component')

    expect(element).toHaveLength(1)
    expect(element.find('textarea').text()).toEqual('This is the content')
  })
})