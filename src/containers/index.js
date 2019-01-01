// @flow

import * as React from 'react'
import * as ReactRedux from 'react-redux'

import shortid from 'shortid'

import type {
  DocumentStateRecord
} from '../store/reducers'

import {
  SetDocument,
  AppendComponent,
  UpdateComponent,
  FocusComponent,
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
  OnSetDocument?: (slug: string, content: DocumentComponentState[]) => void,
  OnAppendContent?: () => void,
  OnContentChange?: (id: string, content: string) => void,
  OnFocusChange?: (id: string) => void
}

const MapStateToProps = (state: DocumentStateRecord): DocumentContainerProps => {
  const document: Document = state.toJS()

  return {
    slug: document.slug,
    components: document.components
  }
}

const MapDispatchToProps = (dispatch: (action: Action) => void): Object => ({
  OnSetDocument: (slug: string, content: DocumentComponentState[]): void => dispatch(SetDocument(slug, content)),
  OnAppendContent: (id: string, value: string): void => dispatch(AppendComponent(id, shortid.generate(), value)),
  OnContentChange: (id: string, content: string): void => dispatch(UpdateComponent(id, content)),
  OnFocusChange: (id: string): void => dispatch(FocusComponent(id))
})

class DocumentContainer extends React.Component<DocumentContainerProps> {
  constructor (props: DocumentContainerProps) {
    super(props)

    const OnSetDocument: void | (slug: string, content: DocumentComponentState[]) => void = props.OnSetDocument

    OnSetDocument && OnSetDocument('test-document', [{
      id: shortid.generate(),
      content: 'This is where you start',
      focused: true
    }])
  }

  render (): React.Node {
    const props: DocumentContainerProps = this.props

    return <React.Fragment>
      {props.presentation && props.presentation(props)}
    </React.Fragment>
  }
}

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(DocumentContainer)