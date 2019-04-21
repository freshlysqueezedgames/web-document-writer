// @flow
import {
  DOCUMENT_COMPONENT_TYPE,
  DocumentComponentState,
  DROP_MODE,
  DOCUMENT_HIGHLIGHT_TYPE,
  HighlightOptions,
  DocumentComponentConfig
} from '../types'

export interface DocumentAction {
  type: 'SET_DOCUMENT'
  slug: string
  content: DocumentComponentConfig[]
}

export interface AddComponentAction {
  id: string;
  content: string;
  focused: boolean;
  componentType: number;
}

export interface PrependComponentAction extends AddComponentAction {
  type: 'PREPEND_COMPONENT';
  before: string;
}

export interface AppendComponentAction extends AddComponentAction {
  type: 'APPEND_COMPONENT';
  after: string;
}

export interface UpdateComponentAction {
  type: 'UPDATE_COMPONENT';
  id: string;
  content: string;
}

export interface RemoveComponentAction {
  type: 'REMOVE_COMPONENT';
  id: string;
}

export interface UpdateComponentTypeAction {
  type: 'UPDATE_COMPONENT_TYPE';
  componentType: number;
}

export interface FocusComponentAction {
  type: 'FOCUS_COMPONENT';
  id: string;
}

export interface UpdateCursorAction {
  type: 'UPDATE_CURSOR';
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface UpdateCursorOffsetsAction {
  type: 'UPDATE_CURSOR_OFFSETS';
  offsetX: number;
  offsetY: number;
}

export interface MoveTargetComponentAction {
  type: 'MOVE_TARGET_COMPONENT_ACTION'
  id: string
  mode: DROP_MODE
}

export interface MoveComponentAction {
  type: 'MOVE_COMPONENT_ACTION'
  id: string
}

export interface HighlightRangeAction {
  type: 'HIGHLIGHT_RANGE',
  id: string,
  start: number,
  end: number,
  name: DOCUMENT_HIGHLIGHT_TYPE,
  options?: HighlightOptions
}

export type Action = 
  DocumentAction | 
  PrependComponentAction |
  AppendComponentAction | 
  UpdateComponentAction |
  UpdateComponentTypeAction | 
  FocusComponentAction | 
  UpdateCursorAction | 
  UpdateCursorOffsetsAction |
  RemoveComponentAction |
  MoveTargetComponentAction |
  MoveComponentAction | 
  HighlightRangeAction |
  {type: 'EMPTY'}

export const SetDocument = (slug: string, content: DocumentComponentConfig[]): DocumentAction => ({
  type: 'SET_DOCUMENT',
  slug,
  content
})

export const PrependComponent = (before: string, id: string, content: string, focused: boolean = true, componentType: number = DOCUMENT_COMPONENT_TYPE.PARAGRAPH): PrependComponentAction => ({
  type: 'PREPEND_COMPONENT',
  before,
  id,
  content,
  focused,
  componentType
})

export const AppendComponent = (after: string, id: string, content: string, focused: boolean = true, componentType: number = DOCUMENT_COMPONENT_TYPE.PARAGRAPH): AppendComponentAction => ({
  type: 'APPEND_COMPONENT',
  after,
  id,
  content,
  focused,
  componentType
})

export const UpdateComponent = (id: string, content: string): UpdateComponentAction => ({
  type: 'UPDATE_COMPONENT',
  id,
  content
})

export const UpdateComponentType = (componentType: number): UpdateComponentTypeAction => ({
  type: 'UPDATE_COMPONENT_TYPE',
  componentType
})

export const FocusComponent = (id: string): FocusComponentAction => ({
  type: 'FOCUS_COMPONENT',
  id
})

export const UpdateCursor = (top: number, right: number, bottom: number, left: number): UpdateCursorAction => ({
  type: 'UPDATE_CURSOR',
  top,
  right,
  bottom,
  left
})

export const UpdateCursorOffsets = (offsetX: number, offsetY: number): UpdateCursorOffsetsAction => ({
  type: 'UPDATE_CURSOR_OFFSETS',
  offsetX,
  offsetY
})

export const RemoveComponent = (id: string): RemoveComponentAction => ({
  type: 'REMOVE_COMPONENT',
  id
})

export const MoveTargetComponent = (id: string, mode: DROP_MODE = DROP_MODE.APPEND): MoveTargetComponentAction => ({
  type: 'MOVE_TARGET_COMPONENT_ACTION',
  id,
  mode
})

export const MoveComponent = (id: string): MoveComponentAction => ({
  type: 'MOVE_COMPONENT_ACTION',
  id
})

export const HighlightRange = (id: string, start: number, end: number, name: DOCUMENT_HIGHLIGHT_TYPE, options?: HighlightOptions): HighlightRangeAction => ({
  type: 'HIGHLIGHT_RANGE',
  id,
  start,
  end,
  name,
  options
})
