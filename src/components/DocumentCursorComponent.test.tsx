// @flow

import * as React from 'react'
import {shallow, ShallowWrapper} from 'enzyme'
import DocumentCursorComponent from './DocumentCursorComponent'

import * as styles from './DocumentCursorComponent.scss'

describe('<DocumentCursorComponent/>', (): void => {
  test('Should render a div representing the cursor element', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentCursorComponent left={0} top={0} bottom={0} right={0}/>)

    expect(wrapper.find(`.${styles.documentCursorComponent}`)).toHaveLength(1)
  })

  test('Should move the cursor position over time to the new location in props after 62 milleseconds', (done: Function): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentCursorComponent left={0} top={0} bottom={0} right={0}/>)

    expect(wrapper.find(`.${styles.documentCursorComponent}`)).toHaveLength(1)

    wrapper.setProps({left: 10, top: 10})

    expect(wrapper.state('left')).toEqual(0)
    expect(wrapper.state('top')).toEqual(0)

    setTimeout(() => {
      expect(wrapper.state('left')).toEqual(10)
      expect(wrapper.state('top')).toEqual(10)

      done()
    }, 150)
  })

  test('Should not animate again if the current position matches the next one', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentCursorComponent left={0} top={0} bottom={0} right={0}/>)

    expect(wrapper.find(`.${styles.documentCursorComponent}`)).toHaveLength(1)

    const requestAnimationFrame: (callback: (timestamp: number) => any) => number = window.requestAnimationFrame
    const mock: jest.Mock = window.requestAnimationFrame = jest.fn()

    wrapper.setProps({left: 0, top: 0})

    expect(mock).not.toHaveBeenCalled()

    window.requestAnimationFrame = requestAnimationFrame
  })

  test('Should stop old animations when superseded by another one', (done: Function): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentCursorComponent left={0} top={0} bottom={0} right={0}/>)

    expect(wrapper.find(`.${styles.documentCursorComponent}`)).toHaveLength(1)
    
    wrapper.setProps({left: 10, top: 10})
    wrapper.setProps({left: 20, top: 20})

    expect(wrapper.state('left')).toEqual(0)
    expect(wrapper.state('top')).toEqual(0)

    setTimeout((): void => {
      expect(wrapper.state('left')).toEqual(20)
      expect(wrapper.state('top')).toEqual(20)

      done()
    }, 150)
  })

  test('Should move the cursor position based on the offsets', (): void => {
    const wrapper: ShallowWrapper = shallow(<DocumentCursorComponent left={20} top={20} bottom={20} right={20} offsetX={20} offsetY={20}/>)
    const element: ShallowWrapper = wrapper.find(`.${styles.documentCursorComponent}`)

    expect(element).toHaveLength(1)

    const style: {top: number, left: number} = element.prop('style')

    expect(style.top).toEqual(0)
    expect(style.left).toEqual(0)
  })
})