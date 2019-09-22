import * as React from 'react'
import {ReactWrapper, mount} from 'enzyme'
import { WithPositionalDrag } from '.';

import * as styles from './index.scss'

describe('<WithPositionalDrag/>', (): void => {
  test('Should be able to create drag events that fix the position of elements', (): void => {
    const WithPositionalDraggable = WithPositionalDrag(() => <div/>, true)

    const wrapper: ReactWrapper = mount(<WithPositionalDraggable/>)

    const div: ReactWrapper = wrapper.find(`.${styles.withDraggableFixed}`)

    expect(div).toHaveLength(1)

    div.simulate('dragstart', {clientX: 100, clientY: 100, dataTransfer: {setDragImage: () => {}}})
    div.simulate('drag', {clientX: 110, clientY: 110})

    expect(wrapper.state('top')).toEqual(10)
    expect(wrapper.state('left')).toEqual(10)

    div.simulate('dragend', {clientX: 120, clientY: 120})

    expect(wrapper.state('top')).toEqual(20)
    expect(wrapper.state('left')).toEqual(20)
  })

  test('Should pick up drag events, that do not fix the position of elements', (): void => {
    const WithPositionalDraggable = WithPositionalDrag(() => <div/>)

    const wrapper: ReactWrapper = mount(<WithPositionalDraggable/>)

    const div: ReactWrapper = wrapper.find(`.${styles.withDraggable}`)

    expect(div).toHaveLength(1)

    div.simulate('dragstart', {clientX: 100, clientY: 100, dataTransfer: {setDragImage: () => {}}})
    div.simulate('drag', {clientX: 110, clientY: 110})

    expect(wrapper.state('top')).toEqual(10)
    expect(wrapper.state('left')).toEqual(10)

    div.simulate('dragend', {clientX: 120, clientY: 120})

    expect(wrapper.state('top')).toEqual(0)
    expect(wrapper.state('left')).toEqual(0)
  })
})