// @flow

import * as React from 'react'

import {type DocumentComponentState} from '../store/reducers'
import {type DocumentContainerProps} from '../containers'

import './index.scss'

export type DocumentComponentComponentProps = {
  id: string,
  content: string
}

const DocumentComponentComponent = (props: DocumentComponentComponentProps): React.Element<'div'> => 
  <div className="document-editor-component">
    {props.content}
  </div>

const DocumentEditorComponent = (props: DocumentContainerProps): React.Element<'div'> =>
  <div className="document-editor-component">
    <h1>Welcome To Your Document Editor</h1>
    <div>{props.slug}</div>
    {props.components && props.components.map((component: DocumentComponentState) => <DocumentComponentComponent key={component.id} {...component}/>)}
  </div>

export default DocumentEditorComponent