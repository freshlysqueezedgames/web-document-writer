// @flow

import * as React from 'react'
import {shallow} from 'enzyme'

import DocumentComponent from './index'

describe('<DocumentComponent/>', (): void => {
  test('Should render the title and slug of the project', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentComponent slug="test"/>)

    expect(wrapper.find('.document-component')).toHaveLength(1)
  })
})