// @flow
import * as React from 'react'
import {
  DOCUMENT_COMPONENT_TYPE
} from '../store/types'

import './DocumentComponentTypeSelection.scss'

interface DocumentComponentTypeSelectionProps {
  OnSelection: (componentType: number) => void
}

interface DocumentComponentTypeSelectionButtonProps extends DocumentComponentTypeSelectionProps {
  componentType: number,
  label: string
}

class DocumentComponentTypeSelectionButton extends React.Component<DocumentComponentTypeSelectionButtonProps> {
  OnClick = () => this.props.OnSelection(this.props.componentType)

  render () {
    return <div className="button" onClick={this.OnClick}>
      {this.props.label}
    </div>
  }
}

const DocumentComponentTypeSelection = (props: DocumentComponentTypeSelectionProps): React.ReactElement<HTMLElement> => 
  <div className="document-component-type-selection">
    <DocumentComponentTypeSelectionButton label="H1" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_1} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="H2" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_2} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="H3" componentType={DOCUMENT_COMPONENT_TYPE.HEADER_3} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="Paragraph" componentType={DOCUMENT_COMPONENT_TYPE.PARAGRAPH} OnSelection={props.OnSelection}/>
    <DocumentComponentTypeSelectionButton label="Code" componentType={DOCUMENT_COMPONENT_TYPE.CODE} OnSelection={props.OnSelection}/>
  </div>

export default DocumentComponentTypeSelection