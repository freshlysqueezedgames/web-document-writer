import React from 'react'

export interface CachedImageProps {
  style?: React.CSSProperties
  image: string
}

export default class CachedImage extends React.Component<CachedImageProps, {}> {
  canvas: HTMLCanvasElement | null = null
  canvasReference = (element: HTMLCanvasElement | null) => this.canvas = element

  render () {
    const props: CachedImageProps = this.props

    return <canvas style={props.style} ref={this.canvasReference}/>
  }

  componentDidMount () {
    const t : CachedImage = this
    console.log('this is my image bro!', this.props, this.canvas)

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
      
      t.canvas.width = img.width
      t.canvas.height = img.height

      context.drawImage(img, 0, 0)
    }
  }
}