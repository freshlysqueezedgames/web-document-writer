// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import type {
  DocumentStateRecord,
  DocumentComponentState
} from '../store/reducers'

import {
  Component,
  type Action
} from '../store/actions'

export type DocumentComponent = {
  
}

export type Document = {
  slug: string,
  components: Array<DocumentComponentState>
}

export type DocumentContainerProps = {
  slug: string,
  components: Array<DocumentComponentState>,
  presentation?: (props: DocumentContainerProps) => React.Node,
  AddComponent?: () => void
}

const MapStateToProps = (state: DocumentStateRecord): DocumentContainerProps => {
  const document: Document = state.toJS()

  return {
    slug: document.slug,
    components: document.components
  }
}

const MapDispatchToProps = (dispatch: (action: Action) => void): Object => ({
  AddComponent: () => dispatch(Component('test', 'this is a test'))
})

const DocumentContainer = (props: DocumentContainerProps): React.Node =>
  <React.Fragment>
    {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(DocumentContainer)