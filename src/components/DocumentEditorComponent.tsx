// @flow

import * as React from 'react'

import DocumentComponentComponent from './DocumentComponentComponent'
import DocumentCursorComponent from './DocumentCursorComponent'
import DocumentComponentTypeSelection, {DocumentComponentTypeSelectionProps} from './DocumentComponentTypeSelection'

import {DocumentComponentState} from '../store/types'
import {DocumentContainerProps, DocumentContainer, CursorContainer, CursorContainerProps} from '../containers'

import {WithDrag} from './DragAndDrop'

import * as styles from './DocumentEditorComponent.scss'

const DocumentEditorComponent = (): React.ReactElement<HTMLDivElement> =>
  <div className={styles.documentEditorComponent}>
    <DocumentContainer presentation={RenderDocument} />
    <CursorContainer presentation={RenderCursor}/>
  </div>

const WithDragDocumentComponentTypeSelection = WithDrag<DocumentComponentTypeSelectionProps>(DocumentComponentTypeSelection, true)

function RenderDocument (props: DocumentContainerProps): React.ReactElement<typeof React.Fragment> {
  return <>
    {props.components && props.components.map((component: DocumentComponentState) => 
      <DocumentComponentComponent
        key={component.id}
        {...component}
        OnContentChange={props.OnContentChange}
        OnAppendContent={props.OnAppendContent}
        OnPrependContent={props.OnPrependContent}
        OnFocus={props.OnFocusChange}
        OnCursorChange={props.OnCursorChange}
      />
    )}
    <WithDragDocumentComponentTypeSelection OnSelection={props.OnComponentTypeChange}/>
  </>
}

function RenderCursor (props: CursorContainerProps) {
  return <DocumentCursorComponent top={props.top} right={props.right} bottom={props.bottom} left={props.left} offsetX={props.offsetX} offsetY={props.offsetY}/>
}

export default DocumentEditorComponent