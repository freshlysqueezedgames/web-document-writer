import React from 'react'

import ImageUploadComponent from './ImageUploadComponent'
import { mount, ReactWrapper } from 'enzyme'

describe('<ImageUploadComponent/>', () => {
  test('Should bind and unbind itself to the document listener events', () => {
    const addEventListener = document.addEventListener
    const removeEventListener = document.removeEventListener

    const listeners: {[key: string]: any} = {}

    document.addEventListener = jest.fn((name: string, callback) => {
      listeners[name] = callback
    })

    document.removeEventListener = jest.fn((name: string, callback) => {
      delete listeners[name]
    })

    const wrapper: ReactWrapper = mount(<ImageUploadComponent OnUpload={() => {}}/>)

    expect(listeners['dragenter']).toBeDefined()
    expect(listeners['dragleave']).toBeDefined()
    expect(listeners['drop']).toBeDefined()

    wrapper.unmount()

    expect(listeners['dragenter']).not.toBeDefined()
    expect(listeners['dragleave']).not.toBeDefined()
    expect(listeners['drop']).not.toBeDefined()

    document.addEventListener = addEventListener
    document.removeEventListener = removeEventListener
  })
})