// @flow
import * as React from 'react'
import {
  DOCUMENT_COMPONENT_TYPE
} from '../store/types'

import * as styles from './DocumentComponentTypeSelection.scss'

export interface DocumentComponentTypeSelectionProps {
  OnSelection: (componentType: number) => void
}

interface DocumentComponentTypeSelectionButtonProps extends DocumentComponentTypeSelectionProps {
  componentType: number,
  label: string
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.91 23.01">
        <g id="Layer_2" data-name="Layer 2">
          <circle className={styles.cls1} cx="1.96" cy="1.96" r="1.96"/>
          <circle className={styles.cls1} cx="1.96" cy="8.15" r="1.96"/>
          <circle className={styles.cls1} cx="1.96" cy="14.86" r="1.96"/>
          <circle className={styles.cls1} cx="1.96" cy="21.06" r="1.96"/>
        </g>
      </svg>
    </div>
    <DocumentComponentTypeSelectionButton label="H1" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_1} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="H2" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_2} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="H3" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_3} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="Paragraph" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="Code" componentType={DOCUMENT_COMPONENT_TYPE.CODE} OnSelection={props.OnSelection}/>
  </div>

export default DocumentComponentTypeSelection