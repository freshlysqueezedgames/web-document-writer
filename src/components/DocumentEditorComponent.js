// @flow

import * as React from 'react'

import DocumentComponentComponent from './DocumentComponentComponent'

import {type DocumentComponentState} from '../store/actions'
import {type DocumentContainerProps} from '../containers'

import './DocumentEditorComponent.scss'

const DocumentEditorComponent = (props: DocumentContainerProps): React.Element<'div'> =>
  <div className="document-editor-component">
    <h1>Welcome To Your Document Editor</h1>
    {props.components && props.components.map((component: DocumentComponentState) => 
      <DocumentComponentComponent
        key={component.id}
        {...component} 
        OnContentChange={props.OnContentChange}
        OnContentAddition={props.OnAppendContent}
        OnFocus={props.OnFocusChange}
      />
    )}
  </div>

export default DocumentEditorComponent