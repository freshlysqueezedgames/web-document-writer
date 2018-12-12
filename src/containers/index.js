// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import type {
  DocumentState,
  ComponentState
} from '../store/reducers'

export type DocumentContainerProps = {
  slug: string,
  components: Array<ComponentState>,
  presentation?: (props: DocumentContainerProps) => React.Node
}

const MapStateToProps = (state: DocumentState): DocumentContainerProps => ({
  slug: state.slug,
  content : state.content
})

const DocumentContainer = (props: DocumentContainerProps): React.Node =>
  <React.Fragment>
    {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps)(DocumentContainer)