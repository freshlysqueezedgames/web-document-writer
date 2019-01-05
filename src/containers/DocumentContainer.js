// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import shortid from 'shortid'

import type {
  EditorStateRecord
} from '../store/reducers'

import {
  AppendComponent,
  UpdateComponent,
  FocusComponent,
  CursorPosition,

  type DocumentComponentState,
  type Action
} from '../store/actions'

export type DocumentComponent = {

}

export type Document = {
  slug: string,
  components: Array<DocumentComponentState>
}

export type DocumentContainerProps = {
  slug: string,
  components: Array<DocumentComponentState>,
  presentation?: (props: DocumentContainerProps) => React.Node,
  OnAppendContent?: () => void,
  OnContentChange?: (id: string, content: string) => void,
  OnFocusChange?: (id: string) => void,
  OnCursorChange?: (x?: number, y?: number) => void
}

const MapStateToProps = (state: EditorStateRecord): DocumentContainerProps => {
  const document: Document = state.toJS().document

  return {
    slug: document.slug,
    components: document.components
  }
}

const MapDispatchToProps = (dispatch: (action: Action) => void): Object => ({
  OnAppendContent: (id: string, value: string): void => dispatch(AppendComponent(id, shortid.generate(), value)),
  OnContentChange: (id: string, content: string): void => dispatch(UpdateComponent(id, content)),
  OnFocusChange: (id: string): void => dispatch(FocusComponent(id)),
  OnCursorChange: (x: number, y: number) => dispatch(CursorPosition(x, y))
})

const DocumentContainer = (props: DocumentContainerProps): React.Element<typeof React.Fragment> => 
  <React.Fragment>
      {props.presentation && props.presentation(props)}
  </React.Fragment>

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(DocumentContainer)