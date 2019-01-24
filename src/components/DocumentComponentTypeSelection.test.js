// @flow
import * as React from 'react'
import {mount, ReactWrapper} from 'enzyme'

import DocumentComponentTypeSelection from './DocumentComponentTypeSelection'
import {DOCUMENT_COMPONENT_TYPE, type DocumentComponentType} from '../store/types'

describe('<DocumentComponentTypeSelection>', (): void => {
  test('Should allow the user to select the type of component', (): void => {
    const mock: JestMockFn<$ReadOnlyArray<DocumentComponentType>, void> = jest.fn()
    const wrapper: ReactWrapper = mount(<DocumentComponentTypeSelection OnSelection={(componentType: DocumentComponentType) => mock(componentType)}/>)

    expect(wrapper.find('.document-component-type-selection')).toHaveLength(1)

    const buttons: ReactWrapper = wrapper.find('div.button')

    expect(buttons).toHaveLength(5)

    const h1Button: ReactWrapper = buttons.first()

    h1Button.simulate('click')

    expect(mock).toHaveBeenCalledWith(DOCUMENT_COMPONENT_TYPE.HEADER_1)
  })

  test('Should highlight the component type that the element already is', (): void => {

  })
})