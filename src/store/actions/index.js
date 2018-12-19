// @flow

export type DocumentAction = {
  type: 'DOCUMENT',
  slug: string
}

export type ComponentAction = {
  type: 'COMPONENT',
  id: string,
  content: string
}

export type UpdateComponentAction = {
  type: 'UPDATE_COMPONENT',
  id: string,
  content: string
}

type DocumentActionCreator = (slug: string) => DocumentAction
type ComponentActionCreator = (id: string, content: string) => ComponentAction
type UpdateComponentActionCreator = (id: string, content: string) => UpdateComponentAction

export type Action = DocumentAction | ComponentAction | UpdateComponentAction

export const Document: DocumentActionCreator = (slug: string): DocumentAction => ({
  type: 'DOCUMENT',
  slug
})

export const Component: ComponentActionCreator = (id: string, content: string) => ({
  type: 'COMPONENT',
  id,
  content
})

export const UpdateComponent: UpdateComponentActionCreator = (id: string, content: string) => ({
  type: 'UPDATE_COMPONENT',
  id,
  content
})