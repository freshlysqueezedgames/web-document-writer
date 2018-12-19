// @flow

import * as React from 'react'

import {type DocumentComponentState} from '../store/reducers'
import {type DocumentContainerProps} from '../containers'

import './index.scss'

export type DocumentComponentComponentProps = {
  id: string,
  content: string,
  ComponentContentChange?: (id: string, content: string) => void
}

export class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps> {
  textAreaRef: HTMLTextAreaElement

  TextAreaRef = (ref: HTMLTextAreaElement): void => {
    this.textAreaRef = ref
  }

  HandleTextAreaChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const props: DocumentComponentComponentProps = this.props

    props.ComponentContentChange && props.ComponentContentChange(props.id, event.currentTarget.value)
  }

  render (): React.Element<'div'> {  
    const props: DocumentComponentComponentProps = this.props

    return <div className="document-component-component">
      <textarea onChange={this.HandleTextAreaChange}>{props.content}</textarea>
    </div>
  }
}

const DocumentEditorComponent = (props: DocumentContainerProps): React.Element<'div'> =>
  <div className="document-editor-component">
    <h1>Welcome To Your Document Editor</h1>
    <div>{props.slug}</div>
    {props.components && props.components.map((component: DocumentComponentState) => <DocumentComponentComponent key={component.id} {...component} ComponentContentChange={props.ComponentContentChange}/>)}
    <button onClick={props.AddComponent}>Click Me</button>
  </div>

export default DocumentEditorComponent