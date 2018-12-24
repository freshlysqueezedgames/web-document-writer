// @flow

import * as React from 'react'

export type DocumentComponentComponentProps = $ReadOnly<{
  id: string,
  content: string,
  ComponentContentChange?: (id: string, content: string) => void
}>

export default class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps> {
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
      <textarea onChange={this.HandleTextAreaChange} ref={this.TextAreaRef} value={props.content}/>
      <div className="document-component-component__content">
        {props.content}
      </div>
    </div>
  }
}