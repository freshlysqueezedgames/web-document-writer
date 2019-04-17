import React from 'react'

import ImageUploadComponent, { DRAG_STATE } from './ImageUploadComponent'
import { DragTarget } from './DragAndDrop'
import { mount, ReactWrapper } from 'enzyme'

import * as styles from './ImageUploadComponent.scss'

jest.useFakeTimers()

describe('<ImageUploadComponent/>', () => {
  function MockDocumentEvents () {
    const addEventListener = document.addEventListener
    const removeEventListener = document.removeEventListener

    type EventCallback = (this: any, event: any) => void

    const listeners: {[key: string]: Array<EventCallback>} = {}

    document.addEventListener = jest.fn((name: string, callback: EventCallback) => {
      if (!listeners[name]) {
        listeners[name] = []
      }

      listeners[name].push(callback)
    })

    document.removeEventListener = jest.fn((name: string, callback: EventCallback) => {
      if (!listeners[name]) {
        return
      }

      let i: number = listeners[name].length
      let eventCallback: EventCallback

      while((eventCallback = listeners[name][--i])) {
        if (eventCallback === callback) {
          listeners[name].splice(i, 1)
        }
      }

      if (!listeners[name].length) {
        delete listeners[name]
      }
    })

    return {
      listeners,
      Dispatch: (name: string, data: any) => {
        if (!listeners[name] || !listeners[name].length) {
          return
        }

        listeners[name].forEach((listener: EventCallback) => {
          listener(data)
        })
      },
      Cancel: () => {
        document.addEventListener = addEventListener
        document.removeEventListener = removeEventListener
      }
    }
  }

  test('Should bind and unbind itself to the document listener events', () => {
    const {listeners, Cancel} = MockDocumentEvents()
    const wrapper: ReactWrapper = mount(<ImageUploadComponent OnUpload={() => {}}/>)

    expect(listeners['dragenter']).toBeDefined()
    expect(listeners['dragleave']).toBeDefined()
    expect(listeners['drop']).toBeDefined()

    wrapper.unmount()

    expect(listeners['dragenter']).not.toBeDefined()
    expect(listeners['dragleave']).not.toBeDefined()
    expect(listeners['drop']).not.toBeDefined()

    Cancel()
  })

  test('Should reveal itself when dragging into the context of the document', (): void => {
    const {listeners, Dispatch, Cancel} = MockDocumentEvents()
    const wrapper: ReactWrapper = mount(<ImageUploadComponent OnUpload={() => {}}/>)

    expect(listeners['dragenter']).toHaveLength(1)

    DragTarget('')

    Dispatch('dragenter', {currentTarget: {}})

    expect(wrapper.state('drag')).toEqual(DRAG_STATE.ACTIVE)

    Cancel()
  })  

  test('Should hide itself when dragging out of the context of the document', (): void => {
    const {listeners, Dispatch, Cancel} = MockDocumentEvents()
    const wrapper: ReactWrapper = mount(<ImageUploadComponent OnUpload={() => {}}/>)

    expect(listeners['dragleave']).toHaveLength(1)

    DragTarget('')

    Dispatch('dragenter', {currentTarget: {}})
    Dispatch('dragleave', {currentTarget: {}})

    expect(wrapper.state('drag')).toEqual(DRAG_STATE.INACTIVE)

    Cancel()
  })  

  test('Should be able to read files from an input element', async (): Promise<void> => {
    let done: boolean = false
    const onUploadMock = jest.fn(() => {
      done = true
    })
    const wrapper: ReactWrapper = mount(<ImageUploadComponent OnUpload={onUploadMock}/>)
    const input: ReactWrapper = wrapper.find('input')

    const mapped = wrapper.instance() as {[key: string]: any}
    const temp = mapped['input']
    mapped['input'] = {files: [new File([''], 'test', {type: "text/plain", lastModified: Date.now()})]}

    const mappedWindow: {[key: string]: any} = window
    const tempFileReader = mappedWindow.FileReader

    mappedWindow.FileReader = function () {
      this.readAsDataURL = () => {
        this.result = 'Test'
        this.onprogress && this.onprogress.call(this, {loaded: 1, total: 1})
        this.onload && this.onload.call(this)
      }
    }

    input.simulate('change')

    expect(onUploadMock).toHaveBeenCalledWith('Test')

    mapped['input'] = temp
    mappedWindow.FileReader = tempFileReader
  })

  test('Should be able to reset itself once the drag has ended', (): void => {
    const {listeners, Dispatch, Cancel} = MockDocumentEvents()
    const wrapper: ReactWrapper = mount(<ImageUploadComponent OnUpload={jest.fn()}/>)

    expect(listeners['drop']).toHaveLength(1)

    Dispatch('drop', {})

    expect(wrapper.state('drag')).toEqual(DRAG_STATE.INACTIVE)

    Cancel()
  })

  test('Should be returned to initial state once animation has ended for drag leave', () => {
    const {listeners, Dispatch, Cancel} = MockDocumentEvents()

    const wrapper: ReactWrapper = mount(<ImageUploadComponent OnUpload={jest.fn()}/>)
    const div: ReactWrapper = wrapper.find(`.${styles.imageUploadComponent}`)

    expect(listeners['dragleave']).toHaveLength(1)

    Dispatch('dragenter', {currentTarget: {}})
    Dispatch('dragleave', {currentTarget: {}})

    expect(wrapper.state('drag')).toEqual(DRAG_STATE.INACTIVE)

    div.simulate('animationend')

    expect(wrapper.state('drag')).toEqual(DRAG_STATE.NONE)

    Cancel()
  })
})