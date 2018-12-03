// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'
import {render} from 'react-dom'

import {store} from './store'

import DocumentContainer, {type DocumentContainerProps} from './containers'
import DocumentComponent from './components'

import './index.html'
import './index.scss'

const app: HTMLElement | null = document.getElementById('app')

if (app) {
  render(
    <ReactRedux.Provider store={store}>
      <DocumentContainer presentation={RenderDocument} />
    </ReactRedux.Provider>,
    app
  )
}

function RenderDocument (props: DocumentContainerProps): React.Node {
  return <DocumentComponent {...props} />
}