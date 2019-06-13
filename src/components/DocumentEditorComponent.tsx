// @flow

import * as React from 'react'

import DocumentComponentComponent from './DocumentComponentComponent'
import DocumentCursorComponent from './DocumentCursorComponent'
import DocumentComponentTypeSelection, {DocumentComponentTypeSelectionProps} from './DocumentComponentTypeSelection'

import {DocumentComponentConfig, DocumentComponentDefinition} from '../store/types'
import {GetDocument} from '../store'
import {DocumentContainerPresentationProps, DocumentContainer, CursorContainer, CursorContainerPresentationProps} from '../containers'

import {WithPositionalDrag} from './DragAndDrop'

import * as styles from './DocumentEditorComponent.scss'

export interface DocumentEditorComponentProps {
  OnSave?: (document: Array<DocumentComponentDefinition>) => Promise<void>,
  OnImageUpload?: (data: string) => Promise<string>
}

let OnImageUpload: ((data: string) => Promise<string>) | undefined
let OnSave: ((document: Array<DocumentComponentDefinition>) => Promise<void>) | undefined

const DocumentEditorComponent = (props: DocumentEditorComponentProps): React.ReactElement<HTMLDivElement> => {
  OnImageUpload = props.OnImageUpload
  OnSave = props.OnSave

  return <div className={styles.documentEditorComponent}>
    <DocumentContainer presentation={RenderDocument}/>
    <CursorContainer presentation={RenderCursor}/>
  </div>
}

const WithPositionalDragDocumentComponentTypeSelection = WithPositionalDrag<DocumentComponentTypeSelectionProps>(DocumentComponentTypeSelection, true, 'document-component-type-selector')

export interface DocumentState {
  startOffset: number
  endOffset: number
}

function RenderDocument (props: DocumentContainerPresentationProps) {
  return <DocumentComponent {...props}/>
}

class DocumentComponent extends React.Component<DocumentContainerPresentationProps, DocumentState> {
  state: DocumentState = {
    startOffset: 0,
    endOffset: 0
  }

  OnHighlightChange = (startOffset: number, endOffset: number) => this.setState({startOffset, endOffset})

  render (): React.ReactElement<typeof React.Fragment> {
    const props: DocumentContainerPresentationProps = this.props
    const t: DocumentComponent = this

    let focusedComponent: DocumentComponentConfig | undefined
    
    return <>
      {props.components && props.components.map((component: DocumentComponentConfig) => {
        if (component.focused) {
          focusedComponent = component
        }
        
        return <DocumentComponentComponent
          key={component.id}
          {...component}
          OnContentChange={props.OnContentChange}
          OnAppendContent={props.OnAppendContent}
          OnPrependContent={props.OnPrependContent}
          OnFocus={props.OnFocusChange}
          OnCursorChange={props.OnCursorChange}
          OnRemoveContent={props.OnRemoveContent}
          OnMoveTarget={props.OnMoveTarget}
          OnMove={props.OnMove}
          OnImageUpload={OnImageUpload}
          OnHighlightChange={t.OnHighlightChange}
          OnDeleteHighlight={props.OnDeleteHighlight}
        />
      })}
      <WithPositionalDragDocumentComponentTypeSelection
        {...this.state}
        component={focusedComponent}
        OnSelection={props.OnComponentTypeChange}
        OnHighlight={props.OnHighlightTypeChange}
        OnRemoveHighlight={props.OnRemoveHighlightType}
        OnSave={() => {
          OnSave && OnSave(GetDocument())
        }}
      />
    </>
  }
}

function RenderCursor (props: CursorContainerPresentationProps) {
  return <DocumentCursorComponent top={props.top} right={props.right} bottom={props.bottom} left={props.left} offsetX={props.offsetX} offsetY={props.offsetY}/>
}

export default DocumentEditorComponent