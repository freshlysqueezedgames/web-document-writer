// @flow

import * as React from 'react'
import KEY_CODE from '../utils'

import {type DocumentComponentState} from '../store/reducers'
import {type DocumentContainerProps} from '../containers'

import './index.scss'

export type DocumentComponentComponentProps = $ReadOnly<{
  id: string,
  content: string,
  ComponentContentChange?: (id: string, content: string) => void
}>

export class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps> {
  textAreaRef: HTMLTextAreaElement | null = null

  TextAreaRef = (ref: HTMLTextAreaElement | null): void => {
    this.textAreaRef = ref
  }

  HandleTextAreaChange = (): void => {
    const props: DocumentComponentComponentProps = this.props

    props.ComponentContentChange && this.textAreaRef && props.ComponentContentChange(props.id, this.textAreaRef.value)
  }

  render (): React.Element<'div'> {
    const props: DocumentComponentComponentProps = this.props

    return <div className="document-component-component">
      <textarea onChange={this.HandleTextAreaChange} ref={this.TextAreaRef}>{props.content}</textarea>
    </div>
  }
}

export type DocumentEditorAdditionProps = $ReadOnly<{
  OnAddition?: (value: string) => void
}>

export type DocumentEditorAdditionState = $ReadOnly<{
  value: string
}>

export class DocumentEditorAddition extends React.Component<DocumentEditorAdditionProps, DocumentEditorAdditionState> {
  state: DocumentEditorAdditionState = {
    value: ''
  }

  inputRef: HTMLInputElement | null = null

  InputRef = (ref: HTMLInputElement | null): void => {this.inputRef = ref}

  OnKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const props: DocumentEditorAdditionProps = this.props
    let value: string = this.inputRef ? this.inputRef.value : ''

    if (event.keyCode === KEY_CODE.RETURN) {
      props.OnAddition && this.inputRef && props.OnAddition(value)
      value = ''
    }

    this.setState({value})
  }

  OnChange = (): void => {
    this.setState({value : (this.inputRef ? this.inputRef.value : '')})
  }

  render (): React.Element<'input'> {
    return <input onKeyDown={this.OnKeyDown} onChange={this.OnChange} ref={this.InputRef} value={this.state.value}/>
  }
}

const DocumentEditorComponent = (props: DocumentContainerProps): React.Element<'div'> =>
  <div className="document-editor-component">
    <h1>Welcome To Your Document Editor</h1>
    {props.components && props.components.map((component: DocumentComponentState) => <DocumentComponentComponent key={component.id} {...component} ComponentContentChange={props.ComponentContentChange} />)}
    <DocumentEditorAddition OnAddition={props.AddComponent} />
  </div>

export default DocumentEditorComponent