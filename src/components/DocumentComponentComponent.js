// @flow

import * as React from 'react'

import './DocumentComponentComponent.scss'

export type DocumentComponentComponentProps = $ReadOnly<{
  id: string,
  content: string,
  ComponentContentChange?: (id: string, content: string) => void
}>

export type Range = $ReadOnly<{
  startOffset: number,
  endOffset: number
}>

const OFFSET_ZERO: Range = {
  startOffset: 0,
  endOffset: 0
}

export default class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps> {
  textAreaRef: HTMLTextAreaElement | null = null

  TextAreaRef = (ref: HTMLTextAreaElement | null): void => {
    this.textAreaRef = ref
  }

  HandleTextAreaChange = (): void => {
    const props: DocumentComponentComponentProps = this.props

    props.ComponentContentChange && this.textAreaRef && props.ComponentContentChange(props.id, this.textAreaRef.value)
  }

  HandleContentClick = (): void => {
    const textAreaRef: HTMLTextAreaElement | null = this.textAreaRef

    if (textAreaRef === null) {
      return
    }

    const selection: Selection = window.getSelection()
    const {startOffset, endOffset} = selection.rangeCount ? selection.getRangeAt(0) : OFFSET_ZERO

    textAreaRef.focus()
    textAreaRef.selectionStart = startOffset
    textAreaRef.selectionEnd = endOffset
  }

  render (): React.Element<'div'> {
    const props: DocumentComponentComponentProps = this.props

    return <div className="document-component-component">
      <textarea onChange={this.HandleTextAreaChange} ref={this.TextAreaRef} value={props.content}/>
      <div className="document-component-component__content" onClick={this.HandleContentClick}>
        {props.content}
      </div>
    </div>
  }
}