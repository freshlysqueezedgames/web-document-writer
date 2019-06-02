// @flow
import * as React from 'react'
import {mount, ReactWrapper} from 'enzyme'

import DocumentComponentTypeSelection from './DocumentComponentTypeSelection'
import {DOCUMENT_COMPONENT_TYPE} from '../store/types'

import * as styles from './DocumentComponentTypeSelection.scss'

describe('<DocumentComponentTypeSelection>', (): void => {
  test('Should allow the user to select the type of component', (): void => {
    const mock: jest.Mock = jest.fn()
    const wrapper: ReactWrapper = mount(<DocumentComponentTypeSelection 
      startOffset={0}
      endOffset={0}
      component={undefined}
      OnSelection={(componentType: number) => mock(componentType)} 
      OnSave={() => {}} 
      OnHighlight={() => {}}
      OnRemoveHighlight={() => {}}
    />)

    expect(wrapper.find(`.${styles.documentComponentTypeSelection}`)).toHaveLength(1)

    const buttons: ReactWrapper = wrapper.find(`div.${styles.button}`)

    expect(buttons).toHaveLength(10)

    const h1Button: ReactWrapper = buttons.first()

    h1Button.simulate('click')

    expect(mock).toHaveBeenCalledWith(DOCUMENT_COMPONENT_TYPE.HEADER_1)
  })
})