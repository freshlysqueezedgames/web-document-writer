// @flow

import * as React from 'react'
import {render} from 'react-dom'
import * as ReactRedux from 'react-redux'
import shortid from 'shortid'

import {store, SetDocument} from './store'
import {DOCUMENT_COMPONENT_TYPE, DocumentComponentDefinition} from './store/types'

import DocumentEditorComponent from './components'

import * as styles from './index.scss'
import { DocumentContainer } from './containers'

export function LoadDocument (name: string, document: Array<DocumentComponentDefinition>) {
  SetDocument(name, document)
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
    content: 'Welcome To Your Document Editor',
    componentType: DOCUMENT_COMPONENT_TYPE.HEADER_1
  }, {
    content: 'This is where you start',
    componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH
  }, {
    content: 'This is a header 2',
    componentType: DOCUMENT_COMPONENT_TYPE.HEADER_2
  }, {
    content: 'This is a header 3',
    componentType: DOCUMENT_COMPONENT_TYPE.HEADER_3
  }, {
    content: 'This is a code',
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