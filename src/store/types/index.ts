// @flow

import {List, RecordOf} from 'immutable'

export enum DOCUMENT_COMPONENT_TYPE {
  PARAGRAPH = 0,
  HEADER_1,
  HEADER_2,
  HEADER_3,
  CODE,
  IMAGE
}

export enum DOCUMENT_HIGHLIGHT_TYPE {
  BOLD,
  ITALIC,
  UNDERLINE,
  LINK
}

export enum DROP_MODE {
  NONE = 0,
  APPEND,
  PREPEND 
}

export interface LinkOptions {
  url: string
}

export type HighlightOptions = LinkOptions

export interface Range {
  start: number,
  end: number
}

export interface Highlight extends Range {
  name: DOCUMENT_HIGHLIGHT_TYPE,
  options?: HighlightOptions
}

export interface DocumentComponentBase {
  content: string
  componentType: DOCUMENT_COMPONENT_TYPE,
}

export interface DocumentComponentDefinition extends DocumentComponentBase {
  highlights?: Highlight[]
}

export interface DocumentComponentConfig extends DocumentComponentDefinition {
  id: string,
  focused: boolean,
  drop: DROP_MODE
} 

export interface DocumentComponentState extends DocumentComponentBase {
  id: string
  focused: boolean
  drop: DROP_MODE
  highlights: List<RecordOf<Highlight>>
}

export type DocumentComponentStateRecord = RecordOf<DocumentComponentState>

export interface DocumentState {
  slug: string
  components: List<DocumentComponentStateRecord>
}

export type DocumentStateRecord = RecordOf<DocumentState>

export type CursorState = Readonly<{
  top: number
  right: number
  bottom: number
  left: number
  offsetX: number
  offsetY: number
}>

export type CursorStateRecord = RecordOf<CursorState> 

export interface EditorState {
  cursor: CursorStateRecord
  document: DocumentStateRecord
}