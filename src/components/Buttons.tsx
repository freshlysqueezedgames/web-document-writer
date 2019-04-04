import * as React from 'react'
import {Remove, Add, DragIndicator} from './Symbols'

import * as styles from './Buttons.scss'

export interface ButtonProps {
  OnClick: () => void
}

export interface RemoveButtonState {
  animation: string;
}

export class RemoveButton extends React.Component<ButtonProps, RemoveButtonState> {
  state: RemoveButtonState = {
    animation: ''
  }

  cancelled: boolean = false
  triggered: boolean = false

  HandleCancel = () => {
    if (this.triggered) {
      this.cancelled = true
      this.setState({animation: ''})
    }
  }
  
  HandleMouseDown = () => {
    this.triggered = true
    this.setState({animation: styles.increase})

    const timeout = setTimeout((): void => {
      this.triggered = false
      clearTimeout(timeout)

      if (this.cancelled) {
        this.cancelled = false
        return
      }

      this.props.OnClick()
    }, 1200)
  }

  render () {
    const props: ButtonProps = this.props

    return <div className={styles.remove} onMouseDown={this.HandleMouseDown} onMouseLeave={this.HandleCancel} onMouseUp={this.HandleCancel}>
        <div className={`${styles.thermometer} ${this.state.animation}`}/>
        <table>
          <tbody>
            <tr>
              <td>
                <Remove/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  }
}

export const AddButton = (props: ButtonProps) => 
  <div className={styles.add} onClick={props.OnClick}>
    <Add/>
  </div>

export const DragIndicatorButton = () => 
  <div className={styles.dragIndicatorButton}>
    <table>
      <tbody>
        <tr>
          <td>
            <DragIndicator/>
          </td>
        </tr>
      </tbody>
    </table>    
  </div>

  