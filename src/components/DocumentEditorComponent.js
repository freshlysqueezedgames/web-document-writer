// @flow

import * as React from 'react'

import DocumentComponentComponent from './DocumentComponentComponent'
import DocumentEditorAddition from './DocumentEditorAddition'

import {type DocumentComponentState} from '../store/reducers'
import {type DocumentContainerProps} from '../containers'

import './DocumentEditorComponent.scss'

const DocumentEditorComponent = (props: DocumentContainerProps): React.Element<'div'> =>
  <div className="document-editor-component">
    <h1>Welcome To Your Document Editor</h1>
    {props.components && props.components.map((component: DocumentComponentState) => <DocumentComponentComponent key={component.id} {...component} ComponentContentChange={props.ComponentContentChange} />)}
    <DocumentEditorAddition OnAddition={props.AddComponent} />
  </div>

export default DocumentEditorComponent