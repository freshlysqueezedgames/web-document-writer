// @flow

import * as React from 'react'
import KEY_CODE from '../utils'

import './DocumentComponentComponent.scss'

export type DocumentComponentComponentProps = $ReadOnly<{
  id: string,
  content: string,
  focused: boolean,
  OnContentChange?: (id: string, content: string) => void,
  OnContentAddition?: (id: string, content: string) => void,
  OnFocus?: (id: string) => void
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
  ctrlPressed: boolean = false

  TextAreaRef = (ref: HTMLTextAreaElement | null): void => {
    this.textAreaRef = ref

    if (this.props.focused && ref) {
      ref.focus()
    }
  }

  HandleTextAreaChange = (): void => {
    const props: DocumentComponentComponentProps = this.props

    props.OnContentChange && this.textAreaRef && props.OnContentChange(props.id, this.textAreaRef.value)
  }

  HandleContentClick = (): void => {
    const textAreaRef: HTMLTextAreaElement | null = this.textAreaRef

    if (!textAreaRef) {
      return
    }

    const selection: Selection = window.getSelection()
    const {startOffset, endOffset} = selection.rangeCount ? selection.getRangeAt(0) : OFFSET_ZERO

    textAreaRef.focus()
    textAreaRef.selectionStart = startOffset
    textAreaRef.selectionEnd = endOffset

    this.props.OnFocus && this.props.OnFocus(this.props.id)
  }

  HandleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const props: DocumentComponentComponentProps = this.props

    if (event.keyCode === KEY_CODE.CTRL) {
      this.ctrlPressed = true
      return
    }

    if (this.ctrlPressed && event.keyCode === KEY_CODE.RETURN) {
      props.OnContentAddition && props.OnContentAddition(props.id, '')
    }
  }

  HandleKeyUp = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === KEY_CODE.CTRL) {
      this.ctrlPressed = false
    }
  }

  render (): React.Element<'div'> {
    const t: DocumentComponentComponent = this
    const props: DocumentComponentComponentProps = t.props

    return <div className="document-component-component">
      <textarea
        onChange={t.HandleTextAreaChange}
        onKeyDown={t.HandleKeyDown}
        onKeyUp={t.HandleKeyUp}
        ref={t.TextAreaRef}
        value={props.content}
      />
      <div className="document-component-component__content" onClick={t.HandleContentClick}>
        {props.content}
      </div>
    </div>
  }
}