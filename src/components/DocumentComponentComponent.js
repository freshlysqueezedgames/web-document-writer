// @flow

import * as React from 'react'
import KEY_CODE from '../utils'

import {
  DOCUMENT_COMPONENT_TYPE,
  type DocumentComponentType
} from '../store/types'

import './DocumentComponentComponent.scss'

export type DocumentComponentComponentProps = $ReadOnly<{
  id: string,
  content: string,
  focused: boolean,
  componentType: DocumentComponentType,
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

  RenderComponentType (): React.Element<'h1' | 'h2' | 'h3' | 'div'> {
    switch (this.props.componentType) {
      case DOCUMENT_COMPONENT_TYPE.HEADER_1 : {
        return <h1 className="document-component-component__content" onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </h1>
      }
      case DOCUMENT_COMPONENT_TYPE.HEADER_2 : {
        return <h2 className="document-component-component__content" onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </h2>
      }
      case DOCUMENT_COMPONENT_TYPE.HEADER_3 : {
        return <h3 className="document-component-component__content" onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </h3>
      }
      case DOCUMENT_COMPONENT_TYPE.CODE : {
        return <div className="document-component-component__content code" onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </div>
      }
      default: {
        return <div className="document-component-component__content" onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </div>
      }
    }
  }

  RenderContentSpan () {
    const content: string = this.props.content
    const {startOffset, endOffset} = this.state

    return <>
      {content.substr(0, startOffset)}
      <span ref={this.SpanRef}>
        {content.substr(startOffset, endOffset - startOffset)}
      </span>
      {content.substr(endOffset)}
    </>
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
      {this.RenderComponentType()}
    </div>
  }

  componentDidUpdate (): void {
    const t: DocumentComponentComponent = this
    const spanRef: HTMLSpanElement | null = t.spanRef

    if (t.offsetUpdate && spanRef) {
      const {left, top} = spanRef.getBoundingClientRect()

      t.props.OnCursorChange && t.props.OnCursorChange(left, top)

      t.offsetUpdate = false
    }
  }
}