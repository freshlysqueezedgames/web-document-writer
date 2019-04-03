import * as React from 'react'
import {Remove, Add} from './Symbols'

import * as styles from './Buttons.scss'

export interface ButtonProps {
  OnClick: (event: React.SyntheticEvent) => void
}

export const RemoveButton = (props: ButtonProps) =>
  <div className={styles.remove} onClick={props.OnClick}>
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

export const AddButton = (props: ButtonProps) => 
  <div className={styles.add} onClick={props.OnClick}>
    <Add/>
  </div>