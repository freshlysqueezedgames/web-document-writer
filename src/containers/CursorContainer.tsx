// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import {
  CursorState
} from '../store/types'

import {
  EditorStateRecord
} from '../store/reducers/EditorReducer'

interface CursorContainerMappedStateProps {
  top: number,
  right: number,
  bottom: number,
  left: number
}

export interface CursorContainerProps extends CursorContainerMappedStateProps {
  presentation?: (props: CursorContainerProps) => React.ReactElement
}

function MapStateToProps (state: EditorStateRecord): CursorContainerMappedStateProps {
  const cursor: CursorState = state.toJS().cursor
  
  return {...cursor}
}

const CursorContainer = (props: CursorContainerProps): React.ReactElement<typeof React.Fragment> =>
  <React.Fragment>
    {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps)(CursorContainer)