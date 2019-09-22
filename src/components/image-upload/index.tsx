import React from 'react'
import WithAnimation, {KeyMap} from '../animated'
import * as styles from './index.scss'
import { DragTarget } from '../drag-and-drop'

export interface ImageUploadProps {
  OnUpload: (result: string) => void
}

export enum DRAG_STATE {
  NONE,
  ACTIVE,
  INACTIVE
}

export interface ImageUploadState {
  drag: DRAG_STATE
  message: string,
  progress: number
}

export interface TimeBarStyles extends KeyMap<number> {
  width: number
}

export interface TimeBarProps {
  styles: TimeBarStyles
}

const WithAnimationTimeBar = WithAnimation<TimeBarStyles>((props: TimeBarProps) => <div className={styles.bar} style={{width: `${props.styles.width * 100}%`}}/>, {width: 0})

export default class ImageUploadComponent extends React.Component<ImageUploadProps, ImageUploadState> {
  state: ImageUploadState = {
    drag: DRAG_STATE.NONE,
    message: 'Upload Here',
    progress: 0
  }

  dragEnterCount: number = 0
  uploading: boolean = false

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

    t.uploading = true

    t.setState({...t.state, message: 'Uploading...'})

    while (++i < l) {
      const file : File = files[i]
      const reader : FileReader = new FileReader

      reader.onload = function () {
        const progress: number = ++completed / l

        if (progress < 1) {
          t.setState({
            ...t.state, 
            progress, 
            message: `Uploaded ${Math.round(progress * 100)}%`
          })
        } else {
          t.dragEnterCount = 0
          
          t.setState({
            ...t.state, 
            progress: 0, 
            message: `Upload Here`,
            drag: DRAG_STATE.NONE
          })

          t.props.OnUpload && t.props.OnUpload(reader.result as string)
        }
      }

      reader.onprogress = function (event: ProgressEvent) {
        t.setState({...t.state, progress: event.loaded / event.total / l + completed / l})
      }

      reader.readAsDataURL(file)
    }
  }

  HandleDragEnter = (event: DragEvent) => {
    if (!event.currentTarget || DragTarget() !== '') {
      return
    }

    if (this.dragEnterCount++ === 0) {
      this.setState({drag: DRAG_STATE.ACTIVE})
    }
  }

  HandleDragLeave = (event: DragEvent) => {
    if (!event.currentTarget || DragTarget() !== '') {
      return
    }

    if (--this.dragEnterCount === 0) {
      this.setState({drag: DRAG_STATE.INACTIVE})
    }
  }

  HandleDragEnd = (event: DragEvent) => {
    if (event.target !== this.input) {
      this.dragEnterCount = 0
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
    document.addEventListener('drop', this.HandleDragEnd)
  }

  componentWillUnmount () {
    document.removeEventListener('dragenter', this.HandleDragEnter)
    document.removeEventListener('dragleave', this.HandleDragLeave)
    document.removeEventListener('drop', this.HandleDragEnd)
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
      <WithAnimationTimeBar styles={{width: t.state.progress}}/>
      <input
        ref={t.inputReference}
        type="file"
        onChange={t.HandleFileUpload}
      />
    </div>
  }
}