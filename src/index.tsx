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

export function RenderDocument (OnSave: (document: Array<DocumentComponentDefinition>) => Promise<void>, OnImageUpload: (data: string) => Promise<string>) {
  return <ReactRedux.Provider store={store}>
    <DocumentContainer presentation={() => <DocumentEditorComponent OnImageUpload={OnImageUpload} OnSave={OnSave}/>}/>
  </ReactRedux.Provider>
}

export {
  DOCUMENT_COMPONENT_TYPE
}

const app: HTMLElement | null = document.getElementById('web-document-writer-6nsy621t8hkjxsu8')

if (app) {
  LoadDocument('document', [])

  const OnSave = (document: Array<DocumentComponentDefinition>): Promise<void> => {
    return new Promise((resolve) => {
      console.log('got me a document', document)
      resolve()
    })
  }

  const OnImageUpload = (data: string): Promise<string> => {
    return new Promise((resolve) => {
      resolve(data)
    })
  }

  render(
    <div className={styles.wrapper}>
      {RenderDocument(OnSave, OnImageUpload)}
    </div>, app
  )
}