// @flow

import * as React from 'react'
import {shallow, type ShallowWrapper} from 'enzyme'

import DocumentComponentComponent from './DocumentComponentComponent'

describe('<DocumentComponentComponent/>', (): void => {
  test('Should render the content of document component state', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentComponentComponent id="test id" content="This is the content"/>)

    const element: ShallowWrapper = wrapper.find('.document-component-component')

    expect(element).toHaveLength(1)
    expect(element.find('textarea').text()).toEqual('This is the content')
  })
})