import * as React from 'react'
import {ReactWrapper, mount} from 'enzyme'
import { WithDrag } from './DragAndDrop';

import * as styles from './DragAndDrop.scss'

describe('<WithDrag/>', (): void => {
  test('Should be able to create drag events that fix the position of elements', (): void => {
    const WithDraggable = WithDrag(() => <div/>, true)

    const wrapper: ReactWrapper = mount(<WithDraggable/>)

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
    const WithDraggable = WithDrag(() => <div/>)

    const wrapper: ReactWrapper = mount(<WithDraggable/>)

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