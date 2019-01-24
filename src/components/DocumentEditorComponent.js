// @flow

import * as React from 'react'

import DocumentComponentComponent from './DocumentComponentComponent'
import DocumentCursorComponent from './DocumentCursorComponent'
import DocumentComponentTypeSelection from './DocumentComponentTypeSelection'

import {type DocumentComponentState} from '../store/types'
import {type DocumentContainerProps, DocumentContainer, CursorContainer, type CursorContainerProps} from '../containers'

import './DocumentEditorComponent.scss'

const DocumentEditorComponent = (): React.Element<'div'> =>
  <div className="document-editor-component">
    <DocumentContainer presentation={RenderDocument} />
    <CursorContainer presentation={RenderCursor}/>
  </div>

function RenderDocument (props: DocumentContainerProps): React.Element<typeof React.Fragment> {
  return <React.Fragment>
    {props.components && props.components.map((component: DocumentComponentState) => 
      <DocumentComponentComponent
        key={component.id}
        {...component} 
        OnContentChange={props.OnContentChange}
        OnContentAddition={props.OnAppendContent}
        OnFocus={props.OnFocusChange}
        OnCursorChange={props.OnCursorChange}
      />
    )}
    <DocumentComponentTypeSelection OnSelection={props.OnComponentTypeChange}/>
  </React.Fragment>
}

function RenderCursor (props: CursorContainerProps) {
  return <DocumentCursorComponent left={props.left} top={props.top}/>
}

export default DocumentEditorComponent