import * as React from 'react'
import { LinkOptions } from '../../store/types'

import * as styles from './index.scss'
import { Remove } from '../Symbols'

interface HighlightComponentProps {
  id: string,
  className: string
  elements: (JSX.Element | string)[]
} 

export const HighlightComponent = (props: HighlightComponentProps) =>
  <span className={props.className}>
    {props.elements}
  </span>

interface LinkHighlightComponentProps extends HighlightComponentProps {
  options: LinkOptions
  root: HTMLElement | null
  OnDelete?: (id: string) => void 
}

interface LinkHighlightComponentState {
  readonly reveal: string
}

export class LinkHighlightComponent extends React.Component<LinkHighlightComponentProps, LinkHighlightComponentState> {
  state: LinkHighlightComponentState = {
    reveal: ''
  }

  anchorRef: HTMLAnchorElement | null = null

  AnchorRef = (ref: HTMLAnchorElement | null) => this.anchorRef = ref

  OnMouseOver = () => this.setState({reveal: styles.reveal})
  OnMouseOut = () => this.setState({reveal: ''})

  RemoveAnchor = () => this.props.OnDelete && this.props.OnDelete(this.props.id)

  render () {   
    const {className, elements, options} = this.props
    
    let top: number = 0, left: number = 0

    if (this.anchorRef && this.props.root) {
      const rect = this.anchorRef.getBoundingClientRect()
      const parentRect = this.props.root.getBoundingClientRect()

      top = rect.top - parentRect.top
      left = rect.left - parentRect.left
    }

    return <React.Fragment>
      <a
        ref={this.AnchorRef}
        className={className}
        target="_blank"
        href={options.url}
        onMouseOver={this.OnMouseOver}
        onMouseOut={this.OnMouseOut}
      >
        {elements}
      </a>
      <div className={`${styles.linkOptions} ${this.state.reveal}`} style={{top, left}}>
        <div className={styles.url}>
          {options.url}
        </div>
        <div className={styles.deleteButton} onClick={this.RemoveAnchor}>
          <Remove/>
        </div>
      </div>
    </React.Fragment>
  }
}