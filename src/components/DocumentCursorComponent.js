// @flow

import * as React from 'react'

import type {CursorContainerProps} from '../containers'

import './DocumentCursorComponent.scss'

const DocumentCursorComponent = (props: CursorContainerProps): React.Element<'div'> => {
  return <div className="document-cursor-component" style={props}/>
}

export default DocumentCursorComponent