import React from 'react'

export interface ImageUploadProps {

}

enum DRAG_STATE {
  NONE,
  ACTIVE,
  INACTIVE
}

export interface ImageUploadState {
  drag: DRAG_STATE
  message: string,
  progress: number
}

import * as styles from './ImageUploadComponent.scss'

export default class ImageUploadComponent extends React.Component<ImageUploadProps, ImageUploadState> {
  state: ImageUploadState = {
    drag: DRAG_STATE.NONE,
    message: 'Upload Here',
    progress: 0
  }

  dragEnterCount: number = 0

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
    let completed: number = 0

    this.setState({...t.state, message: 'Uploading...'})

    while (++i < l) {
      const file : File = files[i]
      const reader : FileReader = new FileReader

      reader.onload = function () {
        const progress: number = ++completed / l

        t.setState({...t.state, progress, message: progress === 1 ? 'Finished' : 'Uploading'})
      }

      reader.onprogress = function (event: ProgressEvent) {
        console.log('progress mate', event.loaded / event.total / l + completed / l)
        t.setState({...t.state, progress: event.loaded / event.total / l + completed / l})
      }

      reader.readAsDataURL(file)
    }
  }

  HandleDragEnter = (event: DragEvent) => {
    if (!event.currentTarget) {
      return
    }

    if (this.dragEnterCount++ === 0) {
      this.setState({drag: DRAG_STATE.ACTIVE})
    }
  }

  HandleDragLeave = (event: DragEvent) => {
    if (!event.currentTarget) {
      return
    }

    if (--this.dragEnterCount === 0) {
      this.setState({drag: DRAG_STATE.INACTIVE})
    }
  }

  HandleAnimationEnd = () => {
    this.setState((state: ImageUploadState): ImageUploadState => {
      if (state.drag === DRAG_STATE.INACTIVE)
        return {...state, drag: DRAG_STATE.NONE}

      return state
    })
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

    let drag: string = ''

    switch (t.state.drag) {
      case DRAG_STATE.ACTIVE: {
        drag = styles.imageEntry
        break
      }
      case DRAG_STATE.INACTIVE: {
        drag = styles.imageExit
        break
      }
    }

    return <div 
      className={`${styles.imageUploadComponent} ${drag}`}
      onAnimationEnd={t.HandleAnimationEnd}
    >
      <table>
        <tbody>
          <tr>
            <td>
              {t.state.message}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.bar} style={{height: `${t.state.progress * 100}%`}}/>
      <input
        ref={t.inputReference}
        type="file"
        onChange={t.HandleFileUpload}
      />
    </div>
  }
}