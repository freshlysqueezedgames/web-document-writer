import React from 'react'
import { ReactComponentLike } from 'prop-types'

export type KeyMap<T> = {[key: string]: T}

export interface WithAnimationState<T> {
  styles: T
}

export interface WithAnimationProps<T> {
  styles: T
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export default function WithAnimation <T extends KeyMap<number>> (WrappedComponent: ReactComponentLike, initialStyles: T) {
  return class extends React.Component <WithAnimationProps<T>, WithAnimationState<T>> {
    delta: number = 0

    state: WithAnimationState<T> = {
      styles: initialStyles
    }

    shouldComponentUpdate (nextProps: WithAnimationProps<T>): boolean {
      const styles: T = this.props.styles

      for (let key in nextProps.styles) {
        if (hasOwnProperty.call(nextProps.styles, key) && nextProps.styles[key] !== styles[key]) {
          this.Animate(250, key, nextProps.styles[key], this.state.styles[key])
        }
      }

      return true
    }    

    Animate (time: number, key: string, to: number, from: number): void {
      let start: number | undefined
      let styles: T = {...this.state.styles}

      const OnRequestAnimationFrame = (timestamp: number) => {
        if (start === undefined) {
          start = timestamp
        }

        this.delta = (timestamp - start) / time

        if (this.delta < 1) {
          requestAnimationFrame(OnRequestAnimationFrame)
        }

        this.delta = Math.min(this.delta, 1)
        
        styles[key] = from + (to - from) * this.delta

        this.setState({styles})
      }

      requestAnimationFrame(OnRequestAnimationFrame)
    }

    render () {
      return <WrappedComponent styles={this.state.styles}/>
    }
  }
}