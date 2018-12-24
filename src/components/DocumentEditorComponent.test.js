// @flow

import * as React from 'react'
import {shallow, mount, type ShallowWrapper, type ReactWrapper} from 'enzyme'

import DocumentEditorComponent from './DocumentEditorComponent'

describe('<DocumentEditorComponent/>', (): void => {
  test('Should render the title and slug of the project', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentEditorComponent slug="test" components={[]}/>)

    expect(wrapper.find('.document-editor-component')).toHaveLength(1)
  })

  test('Should be able to render a list of document component components for its content', () => {
    const wrapper: ReactWrapper = mount(<DocumentEditorComponent slug="test" components={[{
      id: 'test1',
      content: 'test1'
    }, {
      id: 'test2',
      content: 'test2'
    }]}/>)

    expect(wrapper.find('.document-component-component')).toHaveLength(2)
  })
})
