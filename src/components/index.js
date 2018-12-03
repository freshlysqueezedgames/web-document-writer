// @flow

import * as React from 'react'
import {type DocumentContainerProps} from '../containers'

import './index.scss'

const DocumentComponent = (props: DocumentContainerProps): React.ReactElement<HTMLDivElement> =>
  <div className="document-component">
    <h1>Welcome To Your Document Editor</h1>
    <div className="document-component__slug">{props.slug}</div>
  </div>

export default DocumentComponent