// @flow

import * as React from 'react'

import type {CursorContainerProps} from '../containers'

import './DocumentCursorComponent.scss'

type CursorComponentState = $ReadOnly<{
  top: number,
  left: number
}>

export default class DocumentCursorComponent extends React.Component<CursorContainerProps, CursorComponentState> {
  lastTop: number | typeof undefined
  lastLeft: number | typeof undefined
  
  time: number = 62.5
  
  constructor (props: CursorContainerProps) {
    super(props)

    this.state = {
      top: props.top,
      left: props.left
    }
  }

  OnAnimationFrame: (timestamp: number) => boolean | typeof undefined

  componentDidUpdate (): void {
    const props: CursorContainerProps = this.props
    const state: CursorComponentState = this.state

    if (this.lastTop === props.top && this.lastLeft === props.left) { // only create a new tween if the props have changed
      return
    }

    const top: number = this.lastTop = props.top
    const left: number = this.lastLeft = props.left

    if (state.left * state.top === top * left) {
      return
    }

    let first: number | typeof undefined

    const topDifference: number = state.top - top
    const leftDifference: number = state.left - left

    let OnAnimationFrame = this.OnAnimationFrame = (timestamp: number): void => {
      if (OnAnimationFrame !== this.OnAnimationFrame) { // This is to stop unnecessary calls when the animation is superseded by another one.
        return
      }
      
      if (!first) {
        first = timestamp
      }

      const distance: number = 1 - (timestamp - first) / this.time

      if (distance > 0) {
        this.setState({
          top: (distance * topDifference) + top,
          left: (distance * leftDifference) + left
        })

        requestAnimationFrame(OnAnimationFrame)
      } else {
        this.setState({top, left})
      }
    }

    requestAnimationFrame(this.OnAnimationFrame)
  }

  render (): React.Element<'div'> {
    const state: CursorComponentState = this.state
    
    return <div className="document-cursor-component" style={state}/>
  }
}