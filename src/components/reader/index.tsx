import React, { PropsWithChildren, ReactElement } from 'react'
import CachedImage from '../cached-image'
import { 
  DOCUMENT_COMPONENT_TYPE, 
  DocumentComponentConfig,
  Highlight,
  Range,
  DOCUMENT_HIGHLIGHT_TYPE,
  LinkOptions,
  HighlightOptions
} from '../../store/types'
import { HighlightComponent, LinkHighlightComponent } from '../highlights'
import * as styles from './index.scss'
import { HighlightRecord } from '../../store/reducers/HighlightsReducer'

export interface RenderHighlight extends Highlight {
  rendered: boolean
  options?: HighlightOptions
}

export interface SelectionHighlight extends Range {
  id: string,
  name: -1,
  rendered: boolean
}

interface ReaderProps {
  components?: DocumentComponentConfig[]
}

type ChildFunction = (component: DocumentComponentConfig) => ReactElement

interface ReaderComponentProps {
  componentType: DOCUMENT_COMPONENT_TYPE
  content: string
  OnClick?: (event: React.MouseEvent<HTMLElement>) => void
  ComponentRef?: (ref: HTMLElement | null) => void
}

interface ReaderComponentWrapperProps extends ReaderComponentProps {
  highlights?: Highlight[] | undefined
}

export const Reader: React.SFC<ReaderProps> = props => {
  if (!props.components || !props.components.length || !props.children) {
    return null
  }

  return <>
    {props.components.map<ReactElement | null>(props.children as ChildFunction)}
  </>
}

const HighlightToRenderHighlight = (highlight: Highlight): RenderHighlight => ({...highlight, rendered: false})

export const ReaderComponentWrapper: React.SFC<ReaderComponentWrapperProps> = props => 
  <div className={styles.readerComponentWrapper}>
    <ReaderComponent {...props}>
      {RenderContent({
        SpanRef: () => {},
        containerRef: null
      }, props.highlights ? props.highlights.map(HighlightToRenderHighlight) : [], props.content)}
    </ReaderComponent>
  </div>

export const ReaderComponent: React.SFC<ReaderComponentProps> = props => {
  switch (props.componentType) {
    case DOCUMENT_COMPONENT_TYPE.HEADER_1 : {
      return <h1 ref={props.ComponentRef} className={styles.componentType} onClick={props.OnClick}>
        {props.children}
      </h1>
    }
    case DOCUMENT_COMPONENT_TYPE.HEADER_2 : {
      return <h2 ref={props.ComponentRef} className={styles.componentType} onClick={props.OnClick}>
        {props.children}
      </h2>
    }
    case DOCUMENT_COMPONENT_TYPE.HEADER_3 : {
      return <h3 ref={props.ComponentRef} className={styles.componentType} onClick={props.OnClick}>
        {props.children}
      </h3>
    }
    case DOCUMENT_COMPONENT_TYPE.CODE : {
      return <div ref={props.ComponentRef} className={styles.componentType} onClick={props.OnClick}>
        {props.children}
      </div>
    }
    case DOCUMENT_COMPONENT_TYPE.IMAGE : {
      return <div ref={props.ComponentRef} className={styles.componentType} onClick={props.OnClick}>
        <CachedImage image={props.content}/>
      </div>
    }
    default: {
      return <div ref={props.ComponentRef} className={styles.componentType} onClick={props.OnClick}>
        {props.children}
      </div>
    }
  }
}

interface HighlightProps {
  SpanRef: (ref: HTMLSpanElement | null) => void
  containerRef: HTMLElement | null
  OnDeleteHighlight?: (id: string) => void 
}

export function RenderContent (props: HighlightProps, highlights: (RenderHighlight | SelectionHighlight)[], content: string): (JSX.Element | string)[] {
  if (!highlights.length) {
    return [content]
  }

  const first: Highlight = highlights[0]
  let last = {end: 0, length: 0}

  const output = [
    content.substr(0, first.start),
    ...RenderContentHighlight(props, highlights, content, last),
    content.substr(last.end)
  ]

  return output
}

export function RenderContentHighlight (props: HighlightProps, highlights: (RenderHighlight | SelectionHighlight)[], content: string, last: {end: number, length: number}, i: number = 0): (JSX.Element | string)[] {
  const {start, end, name, id} = highlights[i]
  const temp = highlights[i]
  let highlight: RenderHighlight | SelectionHighlight | undefined
  const children: (RenderHighlight | SelectionHighlight)[] = []
  let elements: (JSX.Element | string)[] = []

  if (end > last.end) {
    last.end = end
  }

  // Figure out which portion of the array belongs to the parent as children
  while ((highlight = highlights[++i])) {
    if (highlight.start >= end) {
      break
    }

    children.push(highlight)
  }

  let j = -1
  last.length = start

  // Next recursively make a heap of JSX elements, taking care to keep content in between
  while ((highlight = children[++j])) {
    if (highlight.rendered) {
      last.length = Math.max(highlight.end, last.length)
      continue
    }

    if (highlight.start > last.length) {
      elements.push(content.substr(last.length, highlight.start - last.length))
    }

    last.length = highlight.end
    elements = [...elements, ...RenderContentHighlight(props, children, content, last)]
  }

  if (last.length < end) {
    elements.push(content.substr(last.length, end - last.length))
    last.length = end
  }

  let className: string = ""

  switch (name) {
    case DOCUMENT_HIGHLIGHT_TYPE.BOLD: {
      className = styles.bold
      break
    }
    case DOCUMENT_HIGHLIGHT_TYPE.ITALIC: {
      className = styles.italic
      break
    }
    case DOCUMENT_HIGHLIGHT_TYPE.UNDERLINE: {
      className = styles.underline
      break
    }
    case DOCUMENT_HIGHLIGHT_TYPE.LINK: {
      className = styles.link
    }
    case -1: {
      className = styles.selection
      break
    }
  }

  let span = HighlightComponent({id, className, elements})

  if (name === DOCUMENT_HIGHLIGHT_TYPE.LINK) {
    const options = ((temp as RenderHighlight).options as LinkOptions)

    span = <LinkHighlightComponent
      key={`${start}${end}${name}`}
      id={id}
      className={className}
      options={options}
      elements={elements}
      root={props.containerRef}
      OnDelete={props.OnDeleteHighlight}
    />
  } else if (name === -1) {
    span = <span key={"highlight"} ref={props.SpanRef} className={className}>
      {elements}
    </span>
  }

  temp.rendered = true

  if (i < highlights.length) {
    return [span, content.substr(end, highlights[i].start - end), ...RenderContentHighlight(props, highlights, content, last, i)]
  }

  return [span]
}