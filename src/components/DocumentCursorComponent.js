// @flow

import * as React from 'react'

import type {CursorContainerProps} from '../containers'

import './DocumentCursorComponent.scss'

type CursorComponentState = $ReadOnly<{
  top: number,
  right: number,
  bottom: number,
  left: number
}>

export default class DocumentCursorComponent extends React.Component<CursorContainerProps, CursorComponentState> {
  lastTop: ?number
  lastRight: ?number
  lastBottom: ?number
  lastLeft: ?number
  
  time: number = 62.5 // milliseconds
  
  constructor (props: CursorContainerProps) {
    super(props)

    this.state = {
      top: props.top,
      right: props.right,
      bottom: props.bottom,
      left: props.left
    }
  }

  OnAnimationFrame: ?(timestamp: number) => ?boolean

  componentDidUpdate (): void {
    const props: CursorContainerProps = this.props
    const state: CursorComponentState = this.state

    if (!(
      this.lastTop !== props.top ||
      this.lastRight !== props.right ||
      this.lastBottom !== props.bottom ||
      this.lastLeft !== props.left
    )) { // only create a new tween if the props have changed
      return
    }

    const top: number = this.lastTop = props.top
    const right: number = this.lastRight = props.right
    const bottom: number = this.lastBottom = props.bottom
    const left: number = this.lastLeft = props.left

    if (!(
      state.top !== top ||
      state.right !== right ||
      state.bottom !== bottom ||
      state.left !== left
    )) {
      return
    }

    let first: ?number

    const topDifference: number = state.top - top
    const rightDifference: number = state.right - right
    const bottomDifference: number = state.bottom - bottom
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
          right: (distance * rightDifference) + right,
          bottom: (distance * bottomDifference) + bottom,
          left: (distance * leftDifference) + left
        })

        requestAnimationFrame(OnAnimationFrame)
      } else {
        this.setState({top, right, bottom, left})
      }
    }

    requestAnimationFrame(this.OnAnimationFrame)
  }

  render (): React.Element<'div'> {
    const state: CursorComponentState = this.state
    const style = {
      top: Math.floor(state.top),
      left: Math.floor(state.left),
      height: Math.floor(state.bottom - state.top)
    }

    return <div className="document-cursor-component" style={style}/>
  }
}