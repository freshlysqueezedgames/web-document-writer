// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import {
  type CursorState
} from '../store/types'

import type {
  EditorStateRecord
} from '../store/reducers/EditorReducer'

interface CursorContainerMappedStateProps {
  top: number,
  left: number
}

export interface CursorContainerProps extends CursorContainerMappedStateProps {
  presentation?: (props: CursorContainerProps) => React.Node
}

function MapStateToProps (state: EditorStateRecord): CursorContainerMappedStateProps {
  const cursor: CursorState = state.toJS().cursor
  
  return {
    left: cursor.x,
    top: cursor.y
  }
}

const CursorContainer = (props: CursorContainerProps): React.Element<typeof React.Fragment> =>
  <React.Fragment>
    {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps)(CursorContainer)