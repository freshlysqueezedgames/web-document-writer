// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'
import shortid from 'shortid'

import {render} from 'react-dom'

import {store} from './store'
import {SetDocument} from './store/actions'

import DocumentEditorComponent from './components'

import './index.html'
import './index.scss'

const app: HTMLElement | null = document.getElementById('app')

store.dispatch(SetDocument('test-document', [{
  id: shortid.generate(),
  content: 'This is where you start',
  focused: true
}]))

if (app) {
  render(
    <ReactRedux.Provider store={store}>
      <DocumentEditorComponent/>
    </ReactRedux.Provider>,
    app
  )
}