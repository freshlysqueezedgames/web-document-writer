// @flow

import React from 'react'
import ImageUploadComponent from './ImageUploadComponent'
import KEY_CODE from '../utils'

import {
  DOCUMENT_COMPONENT_TYPE,
  DROP_MODE
} from '../store/types'

import {DragTarget} from './DragAndDrop'

import * as styles from './DocumentComponentComponent.scss'
import { RemoveButton, AddButton, DragIndicatorButton } from './Buttons';

const DRAG_IDENTIFIER: string = 'document-component' 

export type DocumentComponentComponentProps = Readonly<{
  id: string,
  content: string,
  focused: boolean,
  drop: DROP_MODE,
  componentType: number,

  OnContentChange?: (id: string, content: string) => void,
  OnAppendContent?: (id: string, content: string, componentType?: DOCUMENT_COMPONENT_TYPE) => void,
  OnPrependContent?: (id: string, content: string) => void,
  OnFocus?: (id: string) => void,
  OnCursorChange?: (top: number, right: number, bottom: number, left: number) => void
  OnRemoveContent?: (id: string) => void
  OnMoveTarget?: (id: string, mode: DROP_MODE) => void
  OnMove?: (id: string) => void
  OnImageUpload?: (data: string) => Promise<string>
}>

export type DocumentComponentComponentState = Readonly<{
  startOffset: number,
  endOffset: number,
  mouseMode: string,
  draggable: boolean
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

    let anchorOffset = this.GetNodeTextOffset(selection.anchorNode)
    let focusOffset = this.GetNodeTextOffset(selection.focusNode)

    if (this.GetFurthestNode(selection.anchorNode, selection.focusNode)) {
      startOffset += focusOffset
      endOffset += anchorOffset
    } else {
      startOffset += anchorOffset
      endOffset += focusOffset
    }

    textAreaRef.focus()
    textAreaRef.selectionStart = startOffset
    textAreaRef.selectionEnd = endOffset

    t.props.OnFocus && t.props.OnFocus(t.props.id)

    t.offsetUpdate = true
    t.setState({startOffset, endOffset})
  }

  HandleMouseEnter = (): void => this.setState({mouseMode: styles.entered})
  HandleMouseExit = (): void => this.setState({mouseMode: styles.exited})

  IterateBackwardsThroughNodes (node: Node, callback: (node: Node, parent: boolean) => boolean | void): void {
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

  GetNodeTextOffset (node: Node): number {
    let i: number = 0

    this.IterateBackwardsThroughNodes(node, (node: Node, parent: boolean): void => {
      if (!parent) {
        i += (node.textContent || "").length
      }
    })

    return i
  }

  GetFurthestNode (node1: Node, node2: Node): boolean {
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

  MakeDraggable = () => this.setState({draggable: true})
  
  HandleDragStart = () => {DragTarget(DRAG_IDENTIFIER)}

  HandleDragEnd = () => {
    this.setState({draggable: false})
  
    this.props.OnMove && this.props.OnMove(this.props.id)
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
          <img src={this.props.content}/>
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
    >
      <textarea
        onChange={t.HandleTextAreaChange}
        onKeyDown={t.HandleKeyDown}
        onKeyUp={t.HandleKeyUp}
        ref={t.TextAreaRef}
        value={props.content}
      />
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