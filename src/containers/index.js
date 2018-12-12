// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import type {
  DocumentState,
  DocumentComponentState
} from '../store/reducers'

export type DocumentContainerProps = {
  slug: string,
  components: Array<DocumentComponentState>,
  presentation?: (props: DocumentContainerProps) => React.Node
}

const MapStateToProps = (state: DocumentState): DocumentContainerProps => ({
  slug: state.slug,
  components : state.components
})

const DocumentContainer = (props: DocumentContainerProps): React.Node =>
  <React.Fragment>
    {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps)(DocumentContainer)