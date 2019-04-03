import * as React from 'react'
import * as styles from './Symbols.scss'

export const DragIndicator = () => 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.91 23.01">
    <g id="Layer_2" data-name="Layer 2">
      <circle className={styles.cls1} cx="1.96" cy="1.96" r="1.96"/>
      <circle className={styles.cls1} cx="1.96" cy="8.15" r="1.96"/>
      <circle className={styles.cls1} cx="1.96" cy="14.86" r="1.96"/>
      <circle className={styles.cls1} cx="1.96" cy="21.06" r="1.96"/>
    </g>
  </svg>

export const Add = () => 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.3 19.3" className={styles.add} xmlSpace="preserve">
    <g>
      <rect x="8.4" y="1.1" className={styles.st0} width="2.4" height="17.2"/>
      <rect x="8.4" y="0.8" transform="matrix(6.123234e-17 -1 1 6.123234e-17 0.176 19.0115)" className={styles.st0} width="2.4" height="17.2"/>
    </g>
  </svg>

export const Remove = () =>
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 18.1 18.1" className={styles.remove} xmlSpace="preserve">
    <g>
      <path className={styles.st0} d="M17,3L2.8,17.2c-0.5,0.5-1.2,0.5-1.7,0h0c-0.5-0.5-0.5-1.2,0-1.7L15.3,1.3c0.5-0.5,1.2-0.5,1.7,0l0,0
      C17.4,1.8,17.4,2.6,17,3z"/>
      <path className={styles.st0} d="M15.3,17.2L1.2,3c-0.5-0.5-0.5-1.2,0-1.7l0,0c0.5-0.5,1.2-0.5,1.7,0L17,15.5c0.5,0.5,0.5,1.2,0,1.7l0,0
      C16.5,17.6,15.8,17.6,15.3,17.2z"/>
    </g>
  </svg>
  
  