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

type DocumentActionCreator = (slug: string) => DocumentAction
type ComponentActionCreator = (id: string, content: string) => ComponentAction

export type Action = DocumentAction | ComponentAction

export const Document: DocumentActionCreator = (slug: string): DocumentAction => ({
  type: 'DOCUMENT',
  slug
})

export const Component: ComponentActionCreator = (id: string, content: string) => ({
  type: 'COMPONENT',
  id,
  content
})