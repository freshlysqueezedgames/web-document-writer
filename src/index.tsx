// @flow

import * as React from 'react'
import {render} from 'react-dom'
import * as ReactRedux from 'react-redux'
import shortid from 'shortid'

import {store} from './store'
import {SetDocument} from './store/actions'
import {DOCUMENT_COMPONENT_TYPE} from './store/types'

import DocumentEditorComponent from './components'
import {DocumentComponentState} from './store/types'

import * as styles from './index.scss'

export function LoadDocument (name: string, document: Array<DocumentComponentState>) {
  store.dispatch(SetDocument(name, document))
}

export function RenderDocument () {
  return <ReactRedux.Provider store={store}>
      <DocumentEditorComponent/>
  </ReactRedux.Provider>
}

export {
  DOCUMENT_COMPONENT_TYPE
}

LoadDocument('test-document', [{
  id: shortid.generate(),
  content: 'Welcome To Your Document Editor',
  focused: false,
  componentType: DOCUMENT_COMPONENT_TYPE.HEADER_1
}, {
  id: shortid.generate(),
  content: 'This is where you start',
  focused: false,
  componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
}])

const app: HTMLElement | null = document.getElementById('web-document-writer-6nsy621t8hkjxsu8')

if (app) {
  render(
    <div className={styles.wrapper}>
      {RenderDocument()}
    </div>, app
  )
}