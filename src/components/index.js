// @flow

import * as React from 'react'
import {type DocumentContainerProps} from '../containers'

const DocumentComponent = (props: DocumentContainerProps): React.Node =>
  <div className="document-component">
    <h1>Welcome To Your Document Editor</h1>
    {props.slug}
  </div>

export default DocumentComponent