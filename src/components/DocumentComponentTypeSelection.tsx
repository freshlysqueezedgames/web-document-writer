// @flow
import * as React from 'react'
import {DragIndicator} from './Symbols'

import {
  DOCUMENT_COMPONENT_TYPE, DOCUMENT_HIGHLIGHT_TYPE, HighlightOptions
} from '../store/types'

import * as styles from './DocumentComponentTypeSelection.scss'

export interface DocumentComponentTypeSelectionProps {
  startOffset: number,
  endOffset: number
  OnSelection: (componentType: number) => void,
  OnHighlight: (componentType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number, options?: HighlightOptions) => void,
  OnSave: () => void
}

interface DocumentComponentTypeSelectionState {
  link: string
}

interface DocumentComponentTypeSelectionButtonProps {
  componentType: DOCUMENT_COMPONENT_TYPE,
  label: string,
  OnSelection: (componentType: DOCUMENT_COMPONENT_TYPE) => void
}

interface DocumentHighlightTypeSelectionButtonProps {
  highlightType: DOCUMENT_HIGHLIGHT_TYPE,
  label: string,
  OnSelection: (highlightType: DOCUMENT_HIGHLIGHT_TYPE) => void
}

class DocumentComponentTypeSelectionButton extends React.Component<DocumentComponentTypeSelectionButtonProps> {
  OnClick = () => this.props.OnSelection(this.props.componentType)

  render () {
    return <div className={styles.button} onClick={this.OnClick}>
      {this.props.label}
    </div>
  }
}

class DocumentHighlightTypeSelectionButton extends React.Component<DocumentHighlightTypeSelectionButtonProps> {
  OnClick = () => this.props.OnSelection(this.props.highlightType)

  render () {
    return <div className={styles.button} onClick={this.OnClick}>
      {this.props.label}
    </div>
  }
}

class DocumentComponentTypeSelection extends React.Component<DocumentComponentTypeSelectionProps, DocumentComponentTypeSelectionState> {
  state: DocumentComponentTypeSelectionState = {
    link: ''
  }

  OnHighlight = (highlightType: DOCUMENT_HIGHLIGHT_TYPE) => {
    let options: HighlightOptions | undefined

    if (highlightType === DOCUMENT_HIGHLIGHT_TYPE.LINK) {
      options = {
        url: this.state.link
      }
    }

    this.props.OnHighlight && this.props.OnHighlight(highlightType, this.props.startOffset, this.props.endOffset, options)
  }

  OnLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({link: event.target.value})

  render (): React.ReactElement<HTMLElement> {
    const props: DocumentComponentTypeSelectionProps = this.props

    return <div className={styles.documentComponentTypeSelection}>
      <div className={styles.dragIndicator}>
        <DragIndicator/>
      </div>
      <DocumentComponentTypeSelectionButton label="H1" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_1} OnSelection={props.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="H2" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_2} OnSelection={props.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="H3" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_3} OnSelection={props.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="Paragraph" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} OnSelection={props.OnSelection}/>
      <DocumentComponentTypeSelectionButton label="Code" componentType={DOCUMENT_COMPONENT_TYPE.CODE} OnSelection={props.OnSelection}/>
      <div className={styles.partition}/>
      <DocumentHighlightTypeSelectionButton label="Bold" highlightType={DOCUMENT_HIGHLIGHT_TYPE.BOLD} OnSelection={this.OnHighlight}/>
      <DocumentHighlightTypeSelectionButton label="Italic" highlightType={DOCUMENT_HIGHLIGHT_TYPE.ITALIC} OnSelection={this.OnHighlight}/>
      <DocumentHighlightTypeSelectionButton label="Underline" highlightType={DOCUMENT_HIGHLIGHT_TYPE.UNDERLINE} OnSelection={this.OnHighlight}/>
      <div className={styles.partition}/>
      <DocumentHighlightTypeSelectionButton label="Link" highlightType={DOCUMENT_HIGHLIGHT_TYPE.LINK} OnSelection={this.OnHighlight}/>
      <input type="text" value={this.state.link} onChange={this.OnLinkChange}/>
      <div className={`${styles.saveButton} ${styles.button}`} onClick={props.OnSave}>
        Save
      </div>
    </div>
  }
}

export default DocumentComponentTypeSelection