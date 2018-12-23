// @flow

import * as React from 'react'
import {shallow, type ShallowWrapper} from 'enzyme'

import DocumentEditorComponent from './DocumentEditorComponent'

describe('<DocumentEditorComponent/>', (): void => {
  test('Should render the title and slug of the project', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentEditorComponent slug="test" components={[]}/>)

    expect(wrapper.find('.document-editor-component')).toHaveLength(1)
  })
})
