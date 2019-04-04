// @flow

import {List, RecordOf} from 'immutable'

export const DOCUMENT_COMPONENT_TYPE: {[index: string]: number} = {
  PARAGRAPH: 0,
  HEADER_1: 1,
  HEADER_2: 2,
  HEADER_3: 3,
  CODE: 4
}

export enum DROP_MODE {
  NONE = 0,
  APPEND,
  PREPEND 
}

export interface DocumentComponentState {
  id: string;
  content: string;
  focused: boolean;
  drop: DROP_MODE;
  componentType: number;
}

export type DocumentComponentStateRecord = RecordOf<DocumentComponentState>

export interface DocumentState {
  slug: string;
  components: List<DocumentComponentStateRecord>;
}

export type DocumentStateRecord = RecordOf<DocumentState>

export type CursorState = Readonly<{
  top: number;
  right: number;
  bottom: number;
  left: number;
  offsetX: number;
  offsetY: number;
}>

export type CursorStateRecord = RecordOf<CursorState> 

export interface EditorState {
  cursor: CursorStateRecord;
  document: DocumentStateRecord;
}