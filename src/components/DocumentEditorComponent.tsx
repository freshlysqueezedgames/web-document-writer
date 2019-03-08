// @flow

import * as React from 'react'

import DocumentComponentComponent from './DocumentComponentComponent'
import DocumentCursorComponent from './DocumentCursorComponent'
import DocumentComponentTypeSelection from './DocumentComponentTypeSelection'

import {DocumentComponentState} from '../store/types'
import {DocumentContainerProps, DocumentContainer, CursorContainer, CursorContainerProps} from '../containers'

import styles from './DocumentEditorComponent.scss'

const DocumentEditorComponent = (): React.ReactElement<HTMLDivElement> =>
  <div className={styles.documentEditorComponent}>
    <DocumentContainer presentation={RenderDocument} />
    <CursorContainer presentation={RenderCursor}/>
  </div>

function RenderDocument (props: DocumentContainerProps): React.ReactElement<typeof React.Fragment> {
  return <>
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
  </>
}

function RenderCursor (props: CursorContainerProps) {
  return <DocumentCursorComponent top={props.top} right={props.right} bottom={props.bottom} left={props.left}/>
}

export default DocumentEditorComponent