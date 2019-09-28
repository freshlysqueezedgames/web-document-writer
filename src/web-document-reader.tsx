import React from 'react'
import {Reader, ReaderComponentWrapper} from './components/reader'

import {render} from 'react-dom'
import { DocumentComponentConfig, DROP_MODE, DOCUMENT_COMPONENT_TYPE, DOCUMENT_HIGHLIGHT_TYPE } from './store/types'
import { DocumentComponentDefinition } from 'boing/store/types'
import shortid from 'shortid'

const app: HTMLElement | null = document.getElementById('web-document-reader-6nsy621t8hkjxsu8')

function DefinitionToConfig (component: DocumentComponentDefinition): DocumentComponentConfig {
  return {
    ...component,
    focused: false,
    id: shortid.generate(),
    drop: DROP_MODE.NONE
  }
}

export function LoadDocument (components: DocumentComponentDefinition[]) {
  render(<Reader components={components.map(DefinitionToConfig)}>
    {(component: DocumentComponentConfig) => <ReaderComponentWrapper
      key={component.id}
      componentType={component.componentType}
      content={component.content}
      highlights={component.highlights}
    />}
  </Reader>,
  app)
}

if (app) {
  LoadDocument([{
    componentType: DOCUMENT_COMPONENT_TYPE.HEADER_1,
    content: "welcome, to the world of tomorrow!!!!"
  },
  {
    componentType: DOCUMENT_COMPONENT_TYPE.PARAGRAPH,
    content: 'Here is some basic type text that you can use to highlight things',
    highlights: [{
      id: shortid.generate(),
      start: 2,
      end: 8,
      name: DOCUMENT_HIGHLIGHT_TYPE.ITALIC
    }, {
      id: shortid.generate(),
      start: 10,
      end: 20,
      name: DOCUMENT_HIGHLIGHT_TYPE.BOLD
    }, {
      id: shortid.generate(),
      start: 13,
      end: 18,
      name: DOCUMENT_HIGHLIGHT_TYPE.UNDERLINE
    }]
  }])
}
