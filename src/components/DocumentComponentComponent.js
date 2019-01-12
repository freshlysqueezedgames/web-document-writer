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
  OnFocus?: (id: string) => void,
  OnCursorChange?: (x: number, y: number) => void
}>

export type DocumentComponentComponentState = $ReadOnly<{
  startOffset: number,
  endOffset: number
}>

export type Range = $ReadOnly<{
  startOffset: number,
  endOffset: number
}>

const OFFSET_ZERO: Range = {
  startOffset: 0,
  endOffset: 0
}

export default class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps, DocumentComponentComponentState> {
  textAreaRef: HTMLTextAreaElement | null = null
  spanRef: HTMLSpanElement | null = null

  ctrlPressed: boolean = false
  offsetUpdate: boolean = false

  state: DocumentComponentComponentState = {
    startOffset: 0,
    endOffset: 0
  }

  TextAreaRef = (ref: HTMLTextAreaElement | null): void => {
    this.textAreaRef = ref

    if (this.props.focused && ref) {
      ref.focus()
    }
  }

  SpanRef = (ref: HTMLSpanElement | null): void => {
    this.spanRef = ref
  }

  HandleTextAreaChange = (): void => {
    const props: DocumentComponentComponentProps = this.props

    props.OnContentChange && this.textAreaRef && props.OnContentChange(props.id, this.textAreaRef.value)
  }

  HandleContentClick = (): void => {
    const t: DocumentComponentComponent = this
    const textAreaRef: HTMLTextAreaElement | null = this.textAreaRef

    if (!textAreaRef) {
      return
    }

    const selection: Selection = window.getSelection()
    let {startOffset, endOffset} = selection.rangeCount ? selection.getRangeAt(0) : OFFSET_ZERO

    let offset: number = selection.anchorNode ? t.props.content.indexOf(selection.anchorNode.textContent) : 0

    offset = offset === -1 ? 0 : offset

    startOffset += offset
    endOffset += offset

    textAreaRef.focus()
    textAreaRef.selectionStart = startOffset
    textAreaRef.selectionEnd = endOffset

    t.props.OnFocus && t.props.OnFocus(t.props.id)

    t.offsetUpdate = true
    t.setState({startOffset, endOffset})
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

    this.SetStateOffset()
  }

  HandleKeyUp = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === KEY_CODE.CTRL) {
      this.ctrlPressed = false
    }

    this.SetStateOffset()
  }

  SetStateOffset () {
    const textAreaRef: HTMLTextAreaElement | null = this.textAreaRef

    if (!textAreaRef) {
      return
    }

    this.offsetUpdate = true

    this.setState({
      startOffset: textAreaRef.selectionStart,
      endOffset: textAreaRef.selectionEnd
    })
  }

  render (): React.Element<'div'> {
    const t: DocumentComponentComponent = this
    const props: DocumentComponentComponentProps = t.props
    const state: DocumentComponentComponentState = t.state

    const content: string = props.content
    const {startOffset, endOffset} = state

    return <div className="document-component-component">
      <textarea
        onChange={t.HandleTextAreaChange}
        onKeyDown={t.HandleKeyDown}
        onKeyUp={t.HandleKeyUp}
        ref={t.TextAreaRef}
        value={content}
      />
      <div className="document-component-component__content" onClick={t.HandleContentClick}>
        {content.substr(0, startOffset)}
        <span ref={t.SpanRef}>
          {content.substr(startOffset, endOffset - startOffset)}
        </span>
        {content.substr(endOffset)}
      </div>
    </div>
  }

  componentDidUpdate (): void {
    const t: DocumentComponentComponent = this
    const spanRef: HTMLSpanElement | null = t.spanRef

    if (t.offsetUpdate && spanRef) {
      const {left, top} = spanRef.getBoundingClientRect()

      console.log('we need to go from here', left, top)
      t.props.OnCursorChange && t.props.OnCursorChange(left, top)

      t.offsetUpdate = false
    }
  }
}