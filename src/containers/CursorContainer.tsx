// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import {
  EditorStateRecord
} from '../store/reducers/EditorReducer'

export interface CursorContainerPresentationProps {
  top: number,
  right: number,
  bottom: number,
  left: number,
  offsetElement: HTMLElement | null
}

interface MappedStateProps {
  cursor: EditorStateRecord
}

export interface CursorContainerProps {
  presentation?: (props: CursorContainerPresentationProps) => React.ReactElement
}

const MapStateToProps = (state: EditorStateRecord): MappedStateProps => ({cursor: state})

const CursorContainer = (props: CursorContainerProps & MappedStateProps): React.ReactElement<typeof React.Fragment> => 
  <React.Fragment>
    {props.presentation && props.presentation(props.cursor.toJSON().cursor)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps)(CursorContainer)