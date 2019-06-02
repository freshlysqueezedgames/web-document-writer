// @flow
import {
  DOCUMENT_COMPONENT_TYPE,
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
  index: number;
  difference: number;
}

export interface RemoveComponentAction {
  type: 'REMOVE_COMPONENT';
  id: string;
}

export interface UpdateComponentTypeAction {
  type: 'UPDATE_COMPONENT_TYPE';
  componentType: number;
}

export interface UpdateHighlightTypeAction {
  type: 'UPDATE_HIGHLIGHT_TYPE'
  highlightType: number,
  startOffset: number,
  endOffset: number,
  options?: HighlightOptions
}

export interface RemoveHighlightTypeAction {
  type: 'REMOVE_HIGHLIGHT_TYPE',
  highlightType: DOCUMENT_HIGHLIGHT_TYPE,
  startOffset: number,
  endOffset: number
}

export interface DeleteHighlightAction {
  type: 'DELETE_HIGHLIGHT',
  componentId: string,
  id: string
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

export interface RangeAction {
  id: string,
  start: number,
  end: number,
  options?: HighlightOptions
}

export interface HighlightRangeAction extends RangeAction {
  type: 'HIGHLIGHT_RANGE',
  name: DOCUMENT_HIGHLIGHT_TYPE
}

export interface ComponentRangeAction extends RangeAction {
  type: 'COMPONENT_RANGE',
  name: DOCUMENT_COMPONENT_TYPE
}

export type Action = 
  DocumentAction | 
  PrependComponentAction |
  AppendComponentAction | 
  UpdateComponentAction |
  UpdateComponentTypeAction | 
  UpdateHighlightTypeAction |
  RemoveHighlightTypeAction |
  DeleteHighlightAction |
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

export const UpdateComponent = (id: string, content: string, index: number, difference: number): UpdateComponentAction => ({
  type: 'UPDATE_COMPONENT',
  id,
  content,
  index,
  difference
})

export const UpdateComponentType = (componentType: number): UpdateComponentTypeAction => ({
  type: 'UPDATE_COMPONENT_TYPE',
  componentType
})

export const UpdateHighlightType = (highlightType: number, startOffset: number, endOffset: number, options?: HighlightOptions): UpdateHighlightTypeAction => ({
  type: 'UPDATE_HIGHLIGHT_TYPE',
  highlightType,
  startOffset,
  endOffset,
  options
})

export const RemoveHighlightType = (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number): RemoveHighlightTypeAction => ({
  type: 'REMOVE_HIGHLIGHT_TYPE',
  highlightType,
  startOffset,
  endOffset
})

export const DeleteHighlight = (componentId: string, id: string): DeleteHighlightAction => ({
  type: 'DELETE_HIGHLIGHT',
  componentId,
  id
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

export const ComponentRange = (id: string, start: number, end: number, name: DOCUMENT_COMPONENT_TYPE, options?: HighlightOptions): ComponentRangeAction => ({
  type: 'COMPONENT_RANGE',
  id,
  start,
  end,
  name,
  options
})