// @flow

import * as React from 'react'

import {CursorContainerPresentationProps} from '../containers'

import * as styles from './DocumentCursorComponent.scss'

type CursorComponentState = Readonly<{
  top: number,
  right: number,
  bottom: number,
  left: number
}>

export default class DocumentCursorComponent extends React.Component<CursorContainerPresentationProps, CursorComponentState> {
  lastTop: number | undefined
  lastRight: number | undefined
  lastBottom: number | undefined
  lastLeft: number | undefined
  
  time: number = 62.5 // milliseconds
  
  constructor (props: CursorContainerPresentationProps) {
    super(props)

    this.state = {
      top: props.top,
      right: props.right,
      bottom: props.bottom,
      left: props.left
    }
  }

  OnAnimationFrame: ((timestamp: number) => void) | undefined

  componentDidUpdate (): void {
    const props: CursorContainerPresentationProps = this.props
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

    let first: number | undefined

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

  render (): React.ReactElement<HTMLDivElement> {
    const state: CursorComponentState = this.state
    const {offsetX = 0, offsetY = 0}: {offsetX?: number, offsetY?: number} = this.props

    const style = {
      top: Math.floor(state.top) - offsetY,
      left: Math.floor(state.left) - offsetX,
      height: Math.floor(state.bottom - state.top)
    }

    return <div className={styles.documentCursorComponent} style={style}/>
  }
}