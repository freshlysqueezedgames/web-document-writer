// @flow
import * as React from 'react'
import {DragIndicator} from './Symbols'

import {
  DOCUMENT_COMPONENT_TYPE
} from '../store/types'

import * as styles from './DocumentComponentTypeSelection.scss'

export interface DocumentComponentTypeSelectionProps {
  OnSelection: (componentType: number) => void,
  OnSave: () => void
}

interface DocumentComponentTypeSelectionButtonProps {
  componentType: number,
  label: string,
  OnSelection: (componentType: DOCUMENT_COMPONENT_TYPE) => void
}

class DocumentComponentTypeSelectionButton extends React.Component<DocumentComponentTypeSelectionButtonProps> {
  OnClick = () => this.props.OnSelection(this.props.componentType)

  render () {
    return <div className={styles.button} onClick={this.OnClick}>
      {this.props.label}
    </div>
  }
}

const DocumentComponentTypeSelection = (props: DocumentComponentTypeSelectionProps): React.ReactElement<HTMLElement> => 
  <div className={styles.documentComponentTypeSelection}>
    <div className={styles.dragIndicator}>
      <DragIndicator/>
    </div>
    <DocumentComponentTypeSelectionButton label="H1" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_1} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="H2" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_2} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="H3" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_3} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="Paragraph" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="Code" componentType={DOCUMENT_COMPONENT_TYPE.CODE} OnSelection={props.OnSelection}/>
    <div className={`${styles.saveButton} ${styles.button}`} onClick={props.OnSave}>
      Save
    </div>
  </div>

export default DocumentComponentTypeSelection