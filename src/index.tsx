// @flow

import * as React from 'react'
import {render} from 'react-dom'
import * as ReactRedux from 'react-redux'
import shortid from 'shortid'

import {store} from './store'
import {SetDocument} from './store/actions'
import {DOCUMENT_COMPONENT_TYPE, DROP_MODE} from './store/types'

import DocumentEditorComponent from './components'
import {DocumentComponentState} from './store/types'

import * as styles from './index.scss'
import { DocumentContainer } from './containers'

export function LoadDocument (name: string, document: Array<DocumentComponentState>) {
  store.dispatch(SetDocument(name, document))
}

export function RenderDocument (OnImageUpload: (data: string) => Promise<string>) {
  return <ReactRedux.Provider store={store}>
    <DocumentContainer presentation={() => <DocumentEditorComponent OnImageUpload={OnImageUpload}/>}/>
  </ReactRedux.Provider>
}

export {
  DOCUMENT_COMPONENT_TYPE
}

const app: HTMLElement | null = document.getElementById('web-document-writer-6nsy621t8hkjxsu8')

if (app) {
  LoadDocument('test-document', [{
    id: shortid.generate(),
    content: 'Welcome To Your Document Editor',
    focused: false,
    drop: DROP_MODE.NONE,
    componentType: DOCUMENT_COMPONENT_TYPE.HEADER_1
  }, {
    id: shortid.generate(),
    content: 'This is where you start',
    focused: false,
    drop: DROP_MODE.NONE,
    componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
  }, {
    id: shortid.generate(),
    content: 'This is a header 2',
    focused: false,
    drop: DROP_MODE.NONE,
    componentType: DOCUMENT_COMPONENT_TYPE.HEADER_2
  }, {
    id: shortid.generate(),
    content: 'This is a header 3',
    focused: false,
    drop: DROP_MODE.NONE,
    componentType: DOCUMENT_COMPONENT_TYPE.HEADER_3
  }, {
    id: shortid.generate(),
    content: 'This is a code',
    focused: false,
    drop: DROP_MODE.NONE,
    componentType: DOCUMENT_COMPONENT_TYPE.CODE
  }])

  render(
    <div className={styles.wrapper}>
      {RenderDocument((data: string): Promise<string> => {
        return new Promise((resolve) => {
          resolve(data)
        })
      })}
    </div>, app
  )
}