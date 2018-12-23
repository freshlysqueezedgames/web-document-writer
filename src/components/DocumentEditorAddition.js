// @flow

import * as React from 'react'
import KEY_CODE from '../utils'

export type DocumentEditorAdditionProps = $ReadOnly<{
  OnAddition?: (value: string) => void
}>

export type DocumentEditorAdditionState = $ReadOnly<{
  value: string
}>

export default class DocumentEditorAddition extends React.Component<DocumentEditorAdditionProps, DocumentEditorAdditionState> {
  state: DocumentEditorAdditionState = {
    value: ''
  }

  inputRef: HTMLInputElement | null = null

  InputRef = (ref: HTMLInputElement | null): void => {this.inputRef = ref}

  OnKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const props: DocumentEditorAdditionProps = this.props
    let value: string = this.inputRef ? this.inputRef.value : ''

    if (event.keyCode === KEY_CODE.RETURN) {
      props.OnAddition && props.OnAddition(value)
      value = ''
    }

    this.setState({value})
  }

  OnChange = (): void => {
    this.setState({value : (this.inputRef ? this.inputRef.value : '')})
  }

  render (): React.Element<'input'> {
    return <input className="document-editor-addition" onKeyDown={this.OnKeyDown} onChange={this.OnChange} ref={this.InputRef} value={this.state.value}/>
  }
}
