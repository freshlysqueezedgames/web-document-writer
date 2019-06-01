// @flow

import React from 'react'
import ImageUploadComponent from './ImageUploadComponent'
import CachedImage from './CachedImage'
import KEY_CODE from '../utils'

import {
  DOCUMENT_COMPONENT_TYPE,
  DROP_MODE,
  Highlight,
  Range,
  DOCUMENT_HIGHLIGHT_TYPE
} from '../store/types'

import {
  AddRange
} from '../store/ranges'

import {DragTarget} from './DragAndDrop'

import * as styles from './DocumentComponentComponent.scss'
import { RemoveButton, AddButton, DragIndicatorButton } from './Buttons'

export const DRAG_IDENTIFIER: string = 'document-component' 

export type DocumentComponentComponentProps = Readonly<{
  id: string
  content: string
  focused: boolean
  drop: DROP_MODE
  componentType: number
  highlights?: Highlight[]

  OnContentChange?: (id: string, content: string, index: number, difference: number) => void
  OnAppendContent?: (id: string, content: string, componentType?: DOCUMENT_COMPONENT_TYPE) => void
  OnPrependContent?: (id: string, content: string) => void
  OnFocus?: (id: string) => void
  OnCursorChange?: (top: number, right: number, bottom: number, left: number) => void
  OnRemoveContent?: (id: string) => void
  OnMoveTarget?: (id: string, mode: DROP_MODE) => void
  OnMove?: (id: string) => void
  OnImageUpload?: (data: string) => Promise<string>
  OnHighlightChange?: (startOffset: number, endOffset: number) => void
}>

export type DocumentComponentComponentState = Readonly<{
  startOffset: number
  endOffset: number
  mouseMode: string
  draggable: boolean
}>

export type OffsetRange = Readonly<{
  startOffset: number
  endOffset: number
}>

const OFFSET_ZERO : OffsetRange = {
  startOffset: 0,
  endOffset: 0
}

export interface RenderHighlight extends Highlight{
  rendered: boolean
}

export interface SelectionHighlight extends Range {
  name: -1,
  rendered: boolean
}

export default class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps, DocumentComponentComponentState> {
  textAreaRef: HTMLTextAreaElement | null = null
  containerRef: HTMLDivElement | null = null
  componentRef: HTMLElement | null = null
  spanRef: HTMLSpanElement | null = null

  ctrlPressed: boolean = false
  shiftPressed: boolean = false

  offsetUpdate: boolean = false
  dropMode: DROP_MODE = DROP_MODE.NONE

  state: DocumentComponentComponentState = {
    startOffset: 0,
    endOffset: 0,
    mouseMode: '',
    draggable: false
  }

  TextAreaRef = (ref: HTMLTextAreaElement | null): void => {
    this.textAreaRef = ref

    if (this.props.focused && ref) {
      ref.focus()
    }
  }

  ContainerRef = (ref: HTMLDivElement | null): void => {
    this.containerRef = ref
  }

  ComponentRef = (ref: HTMLElement | null): void => {
    this.componentRef = ref
  }

  SpanRef = (ref: HTMLSpanElement | null): void => {
    this.spanRef = ref
  }

  HandleTextAreaChange = (): void => {
    const props: DocumentComponentComponentProps = this.props

    let index: number = 0
    let difference: number = 0

    if (this.textAreaRef) {
      index = this.textAreaRef.selectionStart
      difference = this.textAreaRef.value.length - this.props.content.length
    }

    props.OnContentChange && this.textAreaRef && props.OnContentChange(props.id, this.textAreaRef.value, index, difference)
  }

  HandleContentClick = (): void => {
    const t: DocumentComponentComponent = this
    const textAreaRef: HTMLTextAreaElement | null = this.textAreaRef

    if (!textAreaRef) {
      return
    }

    const selection: Selection | null = window.getSelection()

    let {startOffset, endOffset} = OFFSET_ZERO

    if (selection) {
      const range = selection.rangeCount ? selection.getRangeAt(0) : OFFSET_ZERO

      startOffset = range.startOffset
      endOffset = range.endOffset

      let anchorOffset = this.GetNodeTextOffset(selection.anchorNode)
      let focusOffset = this.GetNodeTextOffset(selection.focusNode)
  
      if (this.GetFurthestNode(selection.anchorNode, selection.focusNode)) {
        startOffset += focusOffset
        endOffset += anchorOffset
      } else {
        startOffset += anchorOffset
        endOffset += focusOffset
      }
    }

    textAreaRef.focus()
    textAreaRef.selectionStart = startOffset
    textAreaRef.selectionEnd = endOffset

    t.props.OnFocus && t.props.OnFocus(t.props.id)

    t.offsetUpdate = true
    t.setState({startOffset, endOffset})

    t.props.OnHighlightChange && t.props.OnHighlightChange(startOffset, endOffset)
  }

  HandleMouseEnter = (): void => this.setState({mouseMode: styles.entered})
  HandleMouseExit = (): void => this.setState({mouseMode: styles.exited})

  IterateBackwardsThroughNodes (node: Node | null, callback: (node: Node, parent: boolean) => boolean | void): void {
    while (node) {
      if (node.previousSibling) {
        node = node.previousSibling
        
        if (callback(node, false) === true) {
          return
        }

        continue
      }

      if (!node.parentNode || node.parentNode === this.componentRef) {
        break
      }

      node = node.parentNode

      if (callback(node, true) === true) {
        return
      }
    }
  }

  GetNodeTextOffset (node: Node | null): number {
    let i: number = 0

    this.IterateBackwardsThroughNodes(node, (node: Node, parent: boolean): void => {
      if (!parent) {
        i += (node.textContent || "").length
      }
    })

    return i
  }

  GetFurthestNode (node1: Node | null, node2: Node | null): boolean {
    let isFurthest = false

    this.IterateBackwardsThroughNodes(node1, (node: Node): boolean | void => {
      if (node === node2) {
        return (isFurthest = true)
      }
    })

    return isFurthest
  }

  HandleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const props: DocumentComponentComponentProps = this.props

    if (event.keyCode === KEY_CODE.CTRL) {
      this.ctrlPressed = true
      return
    }

    if (event.keyCode === KEY_CODE.SHIFT) {
      this.shiftPressed = true
      return
    }

    if (this.ctrlPressed && event.keyCode === KEY_CODE.RETURN) {
      if (this.shiftPressed) {
        props.OnPrependContent && props.OnPrependContent(props.id, '')
      } else {
        props.OnAppendContent && props.OnAppendContent(props.id, '')
      }
    }

    this.SetStateOffset()
  }

  HandleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.keyCode === KEY_CODE.CTRL) {
      this.ctrlPressed = false
      return
    }

    if (event.keyCode === KEY_CODE.SHIFT) {
      this.shiftPressed = false
      return
    }

    this.SetStateOffset()
  }

  MakeDraggable = () => {
    this.setState({draggable: true})
  }
  
  HandleDragStart = () => {DragTarget(DRAG_IDENTIFIER)}

  HandleDragEnd = () => {
    this.setState({draggable: false})
  
    this.props.OnMove && this.props.OnMove(this.props.id)

    DragTarget('')
  }

  HandleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.stopPropagation()

    if (!this.componentRef || DragTarget() !== DRAG_IDENTIFIER) {
      return
    }

    const {top} = this.componentRef.getBoundingClientRect()
    const height: number = this.componentRef.clientHeight
    let dropMode: DROP_MODE = this.dropMode

    this.dropMode = event.clientY - top < height / 2 ? DROP_MODE.APPEND : DROP_MODE.PREPEND

    if (dropMode !== this.dropMode) {
      this.props.OnMoveTarget && this.props.OnMoveTarget(this.props.id, this.dropMode)
    }
  }

  HandleUpload = async (result: string) => {
    const t: DocumentComponentComponent = this

    if (t.props.OnImageUpload) {
      result = await t.props.OnImageUpload(result)
    }

    this.props.OnAppendContent && this.props.OnAppendContent(this.props.id, result, DOCUMENT_COMPONENT_TYPE.IMAGE)
  }

  HandleDrop = () => DragTarget('')

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

    this.props.OnHighlightChange && this.props.OnHighlightChange(textAreaRef.selectionStart, textAreaRef.selectionEnd)
  }

  AppendContent = () => {
    const props: DocumentComponentComponentProps = this.props
    
    props.OnAppendContent && props.OnAppendContent(props.id, '')

    this.SetStateOffset()
  }

  PrependContent = () => {
    const props: DocumentComponentComponentProps = this.props

    props.OnPrependContent && props.OnPrependContent(props.id, '')

    this.SetStateOffset()
  }

  RemoveContent = () => {
    const props: DocumentComponentComponentProps = this.props
    
    props.OnRemoveContent && props.OnRemoveContent(props.id)
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
      case DOCUMENT_COMPONENT_TYPE.IMAGE : {
        return <div ref={this.ComponentRef} className={styles.componentType} onClick={this.HandleContentClick}>
          <CachedImage image={this.props.content}/>
        </div>
      }
      default: {
        return <div ref={this.ComponentRef} className={styles.componentType} onClick={this.HandleContentClick}>
          {this.RenderContentSpan()}
        </div>
      }
    }
  }

  RenderContent (highlights: (RenderHighlight | SelectionHighlight)[], content: string): (JSX.Element | string)[] {
    if (!highlights.length) {
      return [content]
    }

    const first: Highlight = highlights[0]
    let last = {end: 0, length: 0}

    const output = [
      content.substr(0, first.start),
      ...this.RenderContentHighlight(highlights, content, last),
      content.substr(last.end)
    ]

    return output
  }

  RenderContentHighlight (highlights: (RenderHighlight | SelectionHighlight)[], content: string, last: {end: number, length: number}, i: number = 0): (JSX.Element | string)[] {
    const {start, end, name} = highlights[i]
    const temp = highlights[i]
    let highlight: RenderHighlight | SelectionHighlight | undefined
    const children: (RenderHighlight | SelectionHighlight)[] = []
    let elements: (JSX.Element | string)[] = []

    if (end > last.end) {
      last.end = end
    }

    // Figure out which portion of the array belongs to the parent as children
    while ((highlight = highlights[++i])) {
      if (highlight.start >= end) {
        break
      }

      children.push(highlight)
    }

    let j = -1
    last.length = start

    // Next recursively make a heap of JSX elements, taking care to keep content in between
    while ((highlight = children[++j])) {
      if (highlight.rendered) {
        last.length = Math.max(highlight.end, last.length)
        continue
      }

      if (highlight.start > last.length) {
        elements.push(content.substr(last.length, highlight.start - last.length))
      }

      last.length = highlight.end
      elements = [...elements, ...this.RenderContentHighlight(children, content, last)]
    }

    if (last.length < end) {
      elements.push(content.substr(last.length, end - last.length))
      last.length = end
    }

    let className: string = ""

    switch (name) {
      case DOCUMENT_HIGHLIGHT_TYPE.BOLD: {
        className = styles.bold
        break
      }
      case DOCUMENT_HIGHLIGHT_TYPE.ITALIC: {
        className = styles.italic
        break
      }
      case DOCUMENT_HIGHLIGHT_TYPE.UNDERLINE: {
        className = styles.underline
        break
      }
      case -1: {
        className = styles.selection
        break
      }
    }

    let span: JSX.Element = <span className={className}>
      {elements}
    </span>

    if (name === -1) {
      span = <span ref={this.SpanRef} className={className}>
        {elements}
      </span>
    }

    temp.rendered = true

    if (i < highlights.length) {
      return [span, content.substr(end, highlights[i].start - end), ...this.RenderContentHighlight(highlights, content, last, i)]
    }

    return [span]
  }

  InsertSelectionHighlight (highlights: Highlight[]): (RenderHighlight | SelectionHighlight)[] {
    const {startOffset, endOffset} = this.state
    const renderedHighlights = highlights.map((highlight: Highlight): RenderHighlight => ({...highlight, rendered: false}))
    const selectionHighlight = {
      start: startOffset, 
      end: endOffset, 
      name: -1,
      rendered: false
    }

    return AddRange<RenderHighlight | SelectionHighlight>(renderedHighlights, selectionHighlight) // we will modify props otherwise
  }

  RenderContentSpan () {
    return this.RenderContent(this.InsertSelectionHighlight(this.props.highlights || []), this.props.content)
  }

  RenderTextArea () {
    const t: DocumentComponentComponent = this
    const props = t.props

    if (this.props.componentType !== DOCUMENT_COMPONENT_TYPE.IMAGE) {
      return <textarea
        onChange={t.HandleTextAreaChange}
        onKeyDown={t.HandleKeyDown}
        onKeyUp={t.HandleKeyUp}
        ref={t.TextAreaRef}
        value={props.content}
      />
    }

    return null
  }

  render (): React.ReactElement<HTMLDivElement> {
    const t: DocumentComponentComponent = this
    const props: DocumentComponentComponentProps = t.props

    let mode: string = ''

    if (!this.state.draggable) {
      switch (t.props.drop) {
        case DROP_MODE.APPEND: {
          mode = styles.down
          break
        }
        case DROP_MODE.PREPEND: {
          mode = styles.up
          break
        }
        default : {
          mode = ''
          break
        }
      }
    }

    return <div 
      ref={t.ContainerRef}
      className={`${styles.documentComponentComponent} ${t.state.mouseMode} ${mode}`}
      draggable={t.state.draggable}

      onMouseEnter={t.HandleMouseEnter}
      onMouseLeave={t.HandleMouseExit}

      onDragStart={t.HandleDragStart}
      onDragEnd={t.HandleDragEnd}
      onDragOver={t.HandleDragOver}
      onDrop={t.HandleDrop}
    >
      {this.RenderTextArea()}
      {this.RenderComponentType()}
      <div className={`${styles.prepend} ${styles.hidden}`}>
        <AddButton OnClick={t.PrependContent}/>
      </div>
      <div className={`${styles.append} ${styles.hidden}`}>
        <AddButton OnClick={t.AppendContent}/>
      </div>
      <div className={`${styles.remove} ${styles.hidden}`}>
        <RemoveButton OnClick={t.RemoveContent}/>
      </div>
      <div 
        className={`${styles.drag} ${styles.hidden}`}
        onMouseDown={t.MakeDraggable}
      >
        <DragIndicatorButton/>
      </div>
      <ImageUploadComponent OnUpload={t.HandleUpload}/>
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