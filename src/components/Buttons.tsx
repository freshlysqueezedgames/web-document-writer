import * as React from 'react'
import {Remove, Add} from './Symbols'

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

  HandleCancel = () => {
    this.cancelled = true
    this.setState({animation: ''})
  }
  
  HandleMouseDown = () => {
    this.setState({animation: styles.increase})
  
    const timeout = setTimeout((): void => {
      clearTimeout(timeout)
      
      if (this.cancelled) {
        this.cancelled = false
        return
      }

      this.props.OnClick()
    }, 2000)
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