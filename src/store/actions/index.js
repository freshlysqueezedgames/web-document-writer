// @flow

export type DocumentAction = {
  type: string,
  slug: string
}

type DocumentActionCreator = (slug: string) => DocumentAction

export type Action = DocumentAction

export const Document: DocumentActionCreator = (slug: string): DocumentAction => ({
  type: 'DOCUMENT',
  slug
})