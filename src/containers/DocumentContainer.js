// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import shortid from 'shortid'

import type {
  EditorStateRecord
} from '../store/reducers/EditorReducer'

import {
  AppendComponent,
  UpdateComponent,
  UpdateComponentType,
  FocusComponent,
  UpdateCursor,
  type Action
} from '../store/actions'

import {
  type DocumentComponentType,
  type DocumentComponentState
} from '../store/types'

export type DocumentComponent = {

}

export type Document = {
  slug: string,
  components: Array<DocumentComponentState>
}

interface DocumentContainerMappedStateProps {
  slug: string,
  components: Array<DocumentComponentState>
}

interface DocumentContainerMappedDispatchProps {
  OnAppendContent: (id: string, value: string) => void,
  OnContentChange: (id: string, content: string) => void,
  OnFocusChange: (id: string) => void,
  OnCursorChange: (top: number, right: number, bottom: number, left: number) => void,
  OnComponentTypeChange: (componentType: DocumentComponentType) => void
}

export interface DocumentContainerProps extends DocumentContainerMappedStateProps, DocumentContainerMappedDispatchProps {
  presentation?: (props: DocumentContainerProps) => React.Node
}

const MapStateToProps = (state: EditorStateRecord): DocumentContainerMappedStateProps => {
  const document: Document = state.toJS().document

  return {
    slug: document.slug,
    components: document.components
  }
}

const MapDispatchToProps = (dispatch: (action: Action) => void): DocumentContainerMappedDispatchProps => ({
  OnAppendContent: (id: string, value: string): void => dispatch(AppendComponent(id, shortid.generate(), value)),
  OnContentChange: (id: string, content: string): void => dispatch(UpdateComponent(id, content)),
  OnFocusChange: (id: string): void => dispatch(FocusComponent(id)),
  OnCursorChange: (top: number, right: number, bottom: number, left: number) => dispatch(UpdateCursor(top, right, bottom, left)),
  OnComponentTypeChange: (componentType: DocumentComponentType) => dispatch(UpdateComponentType(componentType))
})

const DocumentContainer = (props: DocumentContainerProps): React.Element<typeof React.Fragment> =>
  <React.Fragment>
      {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(DocumentContainer)