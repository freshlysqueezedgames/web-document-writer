import React from 'react'

export interface ImageUploadProps {

}

enum DRAG_STATE {
  NONE,
  ACTIVE
}

export interface ImageUploadState {
  drag: DRAG_STATE
}

import * as styles from './ImageUploadComponent.scss'

export default class ImageUploadComponent extends React.Component<ImageUploadProps, ImageUploadState> {
  state: ImageUploadState = {
    drag: DRAG_STATE.NONE
  }

  input: HTMLInputElement | null = null
  inputReference = (element: HTMLInputElement | null) => this.input = element

  HandleFileUpload = () => {
    const t: ImageUploadComponent = this

    if (!t.input || !t.input.files) {
      return
    }

    const files: FileList = t.input.files
  
    let i : number = -1
    const l : number = files.length

    while (++i < l) {
      const file : File = files[i]
      const reader : FileReader = new FileReader

      reader.onload = function (event: ProgressEvent) {
        const {result} = reader

        console.log('bloody marvellous', result, event)
      }

      reader.onprogress = function (event: ProgressEvent) {
        console.log('off we go son!', event.loaded, event.total)
      }

      reader.readAsDataURL(file)
    }
  }

  HandleDragEnter = (event: DragEvent) => {
    console.log('something nice?', event)

    if (!event.currentTarget) {
      return
    }
    
    console.log('me?', event.currentTarget, event.target)
    console.dir(event.currentTarget)

    if ((event.currentTarget as Document).nodeName === '#document') {
      this.setState({drag: DRAG_STATE.ACTIVE})
    }
  }

  HandleDragLeave = (event: DragEvent) => {
    if (!event.currentTarget) {
      return
    }

    if ((event.currentTarget as Document).nodeName === '#document') {
      this.setState({drag: DRAG_STATE.NONE})
    }
  }

  componentDidMount () {
    document.addEventListener('dragenter', this.HandleDragEnter)
    document.addEventListener('dragleave', this.HandleDragLeave)
  }

  componentWillUnmount () {
    document.removeEventListener('dragenter', this.HandleDragEnter)
    document.removeEventListener('dragleave', this.HandleDragLeave)
  }

  render () {
    const t: ImageUploadComponent = this

    return <input
      ref={t.inputReference}
      type="file"
      className={`${styles.imageUploadComponent} ${t.state.drag === DRAG_STATE.NONE ? '' : styles.imageEntry}`}
      onChange={t.HandleFileUpload}
    />
  }
}