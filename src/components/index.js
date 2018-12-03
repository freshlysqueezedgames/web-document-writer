// @flow

import * as React from 'react'
import {type DocumentContainerProps} from '../containers'

import './index.scss'

const DocumentEditorComponent = (props: DocumentContainerProps): React.Element<'div'> =>
  <div className="document-editor-component">
    <h1>Welcome To Your Document Editor</h1>
    <div>{props.slug}</div>
  </div>

export default DocumentEditorComponent