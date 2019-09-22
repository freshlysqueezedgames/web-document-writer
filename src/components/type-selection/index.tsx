// @flow
import * as React from 'react'
import {DragIndicator} from '../symbols'
import {LinkOptions, DocumentComponentConfig} from '../../store/types'

import {
  DOCUMENT_COMPONENT_TYPE, DOCUMENT_HIGHLIGHT_TYPE, HighlightOptions
} from '../../store/types'

import * as styles from './index.scss'
import { KeyMap } from '../animated'

export interface DocumentComponentTypeSelectionProps {
  startOffset: number
  endOffset: number
  component: DocumentComponentConfig | undefined
  OnSelection: (componentType: number) => void
  OnHighlight: (componentType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number, options?: HighlightOptions) => void
  OnRemoveHighlight: (componentType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => void
  OnSave: () => void
}

interface DocumentComponentTypeSelectionState {
  link: string
  active: KeyMap<boolean>
  linkOptions: LinkOptions | undefined
}

interface SelectionButtonProps <V> {
  OnSelection: (value: V, active: boolean) => void
  label: string,
  value: V,
  active: boolean
}

class SelectionButton<V> extends React.Component<SelectionButtonProps<V>> {
  OnClick = () => this.props.OnSelection(this.props.value, this.props.active)

  render () {
    return <div className={`${styles.button} ${this.props.active ? styles.active : ''}`} onClick={this.OnClick}>
      {this.props.label}
    </div>
  }
}

const DocumentComponentTypeSelectionButton = class extends SelectionButton<DOCUMENT_COMPONENT_TYPE> {}
const DocumentHighlightTypeSelectionButton = class extends SelectionButton<DOCUMENT_HIGHLIGHT_TYPE> {}

class DocumentComponentTypeSelection extends React.Component<DocumentComponentTypeSelectionProps, DocumentComponentTypeSelectionState> {
  state: DocumentComponentTypeSelectionState = {
    link: '',
    active: {},
    linkOptions: undefined
  }

  OnHighlight = (highlightType: DOCUMENT_HIGHLIGHT_TYPE, active: boolean) => {
    if (active) {
      this.props.OnRemoveHighlight && this.props.OnRemoveHighlight(highlightType, this.props.startOffset, this.props.endOffset)
      return
    }
    
    let options: HighlightOptions | undefined

    if (highlightType === DOCUMENT_HIGHLIGHT_TYPE.LINK) {
      options = {
        url: this.state.link
      }
    }

    this.props.OnHighlight && this.props.OnHighlight(highlightType, this.props.startOffset, this.props.endOffset, options)
  }

  OnSelection = (componentType: DOCUMENT_COMPONENT_TYPE) => {
    if (this.props.component && this.props.component.componentType === componentType) {
      return
    }

    this.props.OnSelection && this.props.OnSelection(componentType)
  }

  OnLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({link: event.target.value})

  static getDerivedStateFromProps(nextProps: DocumentComponentTypeSelectionProps, prevState: DocumentComponentTypeSelectionState) {
    const active: KeyMap<boolean> = {}
    const component: DocumentComponentConfig | undefined = nextProps.component

    if (component && component.highlights) {
      const highlights = component.highlights
      let i: number = highlights.length

      while (i--) {
        const highlight = highlights[i]
        
        if (highlight.start >= nextProps.endOffset) {
          continue
        }

        if (highlight.end <= nextProps.startOffset) {
          break
        }

        active[highlight.name] = true
      }
    }

    return {
      ...prevState,
      active
    }
  }

  render (): React.ReactElement<HTMLElement> {
    const props: DocumentComponentTypeSelectionProps = this.props
    const active: KeyMap<boolean> = this.state.active
    const componentType: DOCUMENT_COMPONENT_TYPE = this.props.component ? this.props.component.componentType : DOCUMENT_COMPONENT_TYPE.NONE

    return <div className={styles.documentComponentTypeSelection}>
      <div className={styles.dragIndicator}>
        <DragIndicator/>
      </div>
      <DocumentComponentTypeSelectionButton label="H1" value={DOCUMENT_COMPONENT_TYPE.HEADER_1} active={componentType === DOCUMENT_COMPONENT_TYPE.HEADER_1} OnSelection={this.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="H2" value={DOCUMENT_COMPONENT_TYPE.HEADER_2} active={componentType === DOCUMENT_COMPONENT_TYPE.HEADER_2} OnSelection={this.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="H3" value={DOCUMENT_COMPONENT_TYPE.HEADER_3} active={componentType === DOCUMENT_COMPONENT_TYPE.HEADER_3} OnSelection={this.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="Paragraph" value={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} active={componentType === DOCUMENT_COMPONENT_TYPE.PARAGRAPH} OnSelection={this.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="Code" value={DOCUMENT_COMPONENT_TYPE.CODE} active={componentType === DOCUMENT_COMPONENT_TYPE.CODE} OnSelection={this.OnSelection}/>
      <div className={styles.partition}/>
      <DocumentHighlightTypeSelectionButton label="Bold" value={DOCUMENT_HIGHLIGHT_TYPE.BOLD} active={active[DOCUMENT_HIGHLIGHT_TYPE.BOLD]} OnSelection={this.OnHighlight}/>
      <DocumentHighlightTypeSelectionButton label="Italic" value={DOCUMENT_HIGHLIGHT_TYPE.ITALIC} active={active[DOCUMENT_HIGHLIGHT_TYPE.ITALIC]} OnSelection={this.OnHighlight}/>
      <DocumentHighlightTypeSelectionButton label="Underline" value={DOCUMENT_HIGHLIGHT_TYPE.UNDERLINE}active={active[DOCUMENT_HIGHLIGHT_TYPE.UNDERLINE]} OnSelection={this.OnHighlight}/>
      <div className={styles.partition}/>
      <DocumentHighlightTypeSelectionButton label="Link" value={DOCUMENT_HIGHLIGHT_TYPE.LINK} active={active[DOCUMENT_HIGHLIGHT_TYPE.LINK]} OnSelection={this.OnHighlight}/>
      <input type="text" value={this.state.link} onChange={this.OnLinkChange}/>
      <div className={`${styles.saveButton} ${styles.button}`} onClick={props.OnSave}>
        Save
      </div>
    </div>
  }
}

export default DocumentComponentTypeSelection