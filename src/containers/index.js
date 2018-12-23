// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import shortid from 'shortid'

import type {
  DocumentStateRecord,
    DocumentComponentState
} from '../store/reducers'

import {
  Component,
  UpdateComponent,
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
  AddComponent?: () => void,
  ComponentContentChange?: (id: string, content: string) => void
}

const MapStateToProps = (state: DocumentStateRecord): DocumentContainerProps => {
  const document: Document = state.toJS()

  return {
    slug: document.slug,
    components: document.components
  }
}

const MapDispatchToProps = (dispatch: (action: Action) => void): Object => ({
  AddComponent: (value: string): void => dispatch(Component(shortid.generate(), value)),
  ComponentContentChange: (id: string, content: string): void => dispatch(UpdateComponent(id, content))
})

const DocumentContainer = (props: DocumentContainerProps): React.Node =>
  <React.Fragment>
    {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(DocumentContainer)