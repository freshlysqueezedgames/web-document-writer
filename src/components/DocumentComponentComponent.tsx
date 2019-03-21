// @flow

import React from 'react'
import KEY_CODE from '../utils'

import {
  DOCUMENT_COMPONENT_TYPE
} from '../store/types'

import * as styles from './DocumentComponentComponent.scss'

export type DocumentComponentComponentProps = Readonly<{
  id: string,
  content: string,
  focused: boolean,
  componentType: number,
  OnContentChange?: (id: string, content: string) => void,
  OnContentAddition?: (id: string, content: string) => void,
  OnFocus?: (id: string) => void,
  OnCursorChange?: (top: number, right: number, bottom: number, left: number) => void
}>

export type DocumentComponentComponentState = Readonly<{
  startOffset: number,
  endOffset: number
}>

export type Range = Readonly<{
  startOffset: number,
  endOffset: number
}>

const OFFSET_ZERO: Range = {
  startOffset: 0,
  endOffset: 0
}

export default class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps, DocumentComponentComponentState> {
  textAreaRef: HTMLTextAreaElement | null = null
  componentRef: HTMLElement | null = null
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

  ComponentRef = (ref: HTMLElement | null): void => {
    this.componentRef = ref
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

    console.log('offsets are first', startOffset, endOffset, selection.anchorNode.textContent)
  
    const value: string = selection.toString()
    let offset: number = selection.anchorNode ? t.props.content.indexOf(value || '') : 0

    if (offset) {
      const matches: Array<string> | null = t.props.content.match(new RegExp(value, 'g'))

      if (matches && matches.length > 1) {
        offset = t.props.content.indexOf(value, startOffset)
      }

      startOffset = offset
      endOffset = offset + value.length
    } else {
      offset = selection.anchorNode ? t.props.content.indexOf(selection.anchorNode.textContent || '') : 0

      if (startOffset <= endOffset) {
        startOffset += offset
      }

      endOffset += offset
    }

    textAreaRef.focus()
    textAreaRef.selectionStart = startOffset
    textAreaRef.selectionEnd = endOffset

    t.props.OnFocus && t.props.OnFocus(t.props.id)

    t.offsetUpdate = true
    t.setState({startOffset, endOffset})

    console.log('offsets are', startOffset, endOffset)
  }

  // GetNodeTextOffset (anchorNode: Node): number {
  //   let i: number = 0

  //   while (anchorNode) {
  //     if (anchorNode.previousSibling) {
  //       anchorNode = anchorNode.previousSibling
  //       i += (anchorNode.textContent || "").length
  //       continue
  //     }

  //     if (!anchorNode.parentNode || anchorNode.parentNode === this.componentRef) {
  //       break
  //     }

  //     anchorNode = anchorNode.parentNode
  //   }

  //   return i
  // }

  HandleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
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

  HandleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
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

  RenderComponentType (): React.ReactElement {
    switch (this.props.componentType) {
      case DOCUMENT_COMPONENT_TYPE.HEADER_1 : {
        return <h1 ref={this.ComponentRef} className={styles.componentType} onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </h1>
      }
      case DOCUMENT_COMPONENT_TYPE.HEADER_2 : {
        return <h2 ref={this.ComponentRef} className={styles.componentType} onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </h2>
      }
      case DOCUMENT_COMPONENT_TYPE.HEADER_3 : {
        return <h3 ref={this.ComponentRef} className={styles.componentType} onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </h3>
      }
      case DOCUMENT_COMPONENT_TYPE.CODE : {
        return <div ref={this.ComponentRef} className={styles.componentType} onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </div>
      }
      default: {
        return <div ref={this.ComponentRef} className={styles.componentType} onClick={this.HandleContentClick}>
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

  render (): React.ReactElement<HTMLDivElement> {
    const t: DocumentComponentComponent = this
    const props: DocumentComponentComponentProps = t.props

    return <div className={styles.documentComponentComponent}>
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

  componentDidMount (): void {
    window.addEventListener('resize', this.ImmediatelyUpdateCursor)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.ImmediatelyUpdateCursor)
  }

  componentDidUpdate (): void {
    this.UpdateCursor()
  }

  ImmediatelyUpdateCursor = () => this.props.focused && this.UpdateCursor(true)

  UpdateCursor (overrule: boolean = false) {
    const t: DocumentComponentComponent = this
    const spanRef: HTMLSpanElement | null = t.spanRef
    const componentRef: HTMLElement | null = t.componentRef
    const body: HTMLElement | null = document.body

    if ((t.offsetUpdate || overrule) && spanRef && componentRef && body) {
      let {top, right, bottom, left} = spanRef.getBoundingClientRect()

      if (bottom === top) {
        const element: HTMLElement = componentRef.cloneNode() as HTMLElement

        element.innerHTML = '<br/>'

        body.appendChild(element)

        const singleHeight: number = element.clientHeight

        element.innerHTML = '<br/><br/>'

        const doubleHeight: number = element.clientHeight

        body.removeChild(element)

        const lineHeight: number = doubleHeight - singleHeight
        const boundingTop: number = componentRef.getBoundingClientRect().top

        top = Math.floor((top - boundingTop) / lineHeight) * lineHeight + boundingTop || 0
        bottom = top + lineHeight // We need to make the bottom the true line height, so css lineHeight of the parent element
      }

      t.props.OnCursorChange && t.props.OnCursorChange(top, right, bottom, left)

      t.offsetUpdate = false
    }
  }
}