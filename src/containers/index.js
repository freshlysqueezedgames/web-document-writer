// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import type {
  DocumentState
} from '../store/reducers'

export type DocumentContainerProps = {
  slug: string,
  presentation?: (props: DocumentContainerProps) => React.Node
}

const MapStateToProps = (state: DocumentState): DocumentContainerProps => ({
  slug: state.slug
})

const DocumentContainer = (props: DocumentContainerProps): React.Node =>
  <React.Fragment>
    {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps)(DocumentContainer)