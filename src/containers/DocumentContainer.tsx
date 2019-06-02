// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import shortid from 'shortid'

import {
  EditorStateRecord
} from '../store/reducers/EditorReducer'

import {
  AppendComponent,
  UpdateComponent,
  UpdateComponentType,
  UpdateHighlightType,
  RemoveHighlightType,
  FocusComponent,
  UpdateCursor,
  UpdateCursorOffsets,
  Action,
  PrependComponent,
  RemoveComponent,
  MoveComponent,
  MoveTargetComponent,
  DeleteHighlight
} from '../store/actions'

import {
  DocumentComponentConfig,
  DROP_MODE,
  DOCUMENT_COMPONENT_TYPE,
  DOCUMENT_HIGHLIGHT_TYPE,
  HighlightOptions
} from '../store/types'

import * as styles from './DocumentContainer.scss'

interface DocumentContainerMappedStateProps {
  slug: string,
  components: Array<DocumentComponentConfig>
}

interface DocumentContainerMappedDispatchProps {
  OnAppendContent: (id: string, value: string, componentType?: DOCUMENT_COMPONENT_TYPE) => void
  OnPrependContent: (id: string, value: string) => void
  OnContentChange: (id: string, content: string, index: number, difference: number) => void
  OnFocusChange: (id: string) => void
  OnCursorChange: (top: number, right: number, bottom: number, left: number) => void
  OnComponentTypeChange: (componentType: number) => void
  OnHighlightTypeChange: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => void
  OnRemoveHighlightType: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => void
  OnDeleteHighlight: (componentId: string, id: string) => void
  OnCursorOffsetChange: (offsetX: number, offsetY: number) => void
  OnRemoveContent: (id: string) => void
  OnMoveTarget: (id: string, mode: DROP_MODE) => void
  OnMove: (id: string) => void
}

export interface DocumentContainerProps extends DocumentContainerMappedStateProps, DocumentContainerMappedDispatchProps {
  presentation?: (props: DocumentContainerProps) => React.ReactElement
}

const MapStateToProps = (state: EditorStateRecord): DocumentContainerMappedStateProps => {
  const document: DocumentContainerMappedStateProps = state.toJS().document

  return {
    slug: document.slug,
    components: document.components
  }
}

const MapDispatchToProps = (dispatch: (action: Action) => void): DocumentContainerMappedDispatchProps => ({
  OnAppendContent: (id: string, value: string, componentType: DOCUMENT_COMPONENT_TYPE = DOCUMENT_COMPONENT_TYPE.PARAGRAPH): void => dispatch(AppendComponent(id, shortid.generate(), value, false, componentType)),
  OnPrependContent: (id: string, value: string): void => dispatch(PrependComponent(id, shortid.generate(), value)),
  OnContentChange: (id: string, content: string, index: number, difference: number): void => dispatch(UpdateComponent(id, content, index, difference)),
  OnFocusChange: (id: string): void => dispatch(FocusComponent(id)),
  OnCursorChange: (top: number, right: number, bottom: number, left: number) => dispatch(UpdateCursor(top, right, bottom, left)),
  OnComponentTypeChange: (componentType: number) => dispatch(UpdateComponentType(componentType)),
  OnHighlightTypeChange: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number, options?: HighlightOptions) => dispatch(UpdateHighlightType(highlightType, startOffset, endOffset, options)),
  OnRemoveHighlightType: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => dispatch(RemoveHighlightType(highlightType, startOffset, endOffset)),
  OnDeleteHighlight: (componentId: string, id: string) => dispatch(DeleteHighlight(componentId, id)),
  OnCursorOffsetChange: (offsetX: number, offsetY: number) => dispatch(UpdateCursorOffsets(offsetX, offsetY)),
  OnRemoveContent: (id: string): void => dispatch(RemoveComponent(id)),
  OnMoveTarget: (id: string, mode: DROP_MODE): void => dispatch(MoveTargetComponent(id, mode)),
  OnMove: (id: string) => dispatch(MoveComponent(id))
})

class DocumentContainer extends React.Component<DocumentContainerProps> {
  private element: HTMLDivElement | null = null

  ElementRef = (ref: HTMLDivElement | null) => this.element = ref 

  componentDidMount () {
    this.UpdateOffsets()
    window.addEventListener('resize', this.UpdateOffsets)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.UpdateOffsets)
  }
  
  UpdateOffsets = () => {
    if (!this.element) {
      return
    }

    const {top = 0, left = 0} = this.element.getBoundingClientRect()

    this.props.OnCursorOffsetChange(left, top)
  }

  render (): React.ReactElement<typeof React.Fragment> {
    const props: DocumentContainerProps = this.props

    return <div ref={this.ElementRef} className={styles.documentContainerComponent}>
      {props.presentation && props.presentation(props)}
    </div>
  }
}

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(DocumentContainer)