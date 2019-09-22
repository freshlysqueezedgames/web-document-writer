import React from 'react'

import * as styles from './index.scss'

export interface CachedImageProps {
  style?: React.CSSProperties
  image: string
}

export interface CachedImageState {
  style?: React.CSSProperties
}

export default class CachedImage extends React.Component<CachedImageProps, CachedImageState> {
  canvas: HTMLCanvasElement | null = null
  canvasReference = (element: HTMLCanvasElement | null) => this.canvas = element

  constructor (props: CachedImageProps) {
    super(props)

    this.state = {
      style: props.style
    }
  }

  render () {
    const state: CachedImageState = this.state

    return <canvas style={state.style} ref={this.canvasReference} className={styles.image}/>
  }

  componentDidMount () {
    const t : CachedImage = this

    if (!this.canvas) {
      return
    }

    const context = this.canvas.getContext('2d')

    if (!context) {
      return
    }

    const img = new Image()

    img.src = this.props.image

    img.onload = function () {
      if (!t.canvas) {
        return
      }

      const s: number = t.canvas.scrollWidth / img.width
      const width: number = s < 1 ? t.canvas.scrollWidth : img.width
      const height: number = img.height * Math.min(s, 1)

      t.canvas.width = width
      t.canvas.height = height

      if (s > 1) {
        t.setState({style: {width, height}})
      }

      context.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height)
    }
  }
}