import * as React from 'react'
import * as styles from './DragAndDrop.scss'
import { ReactComponentLike } from 'prop-types';

export interface DragProps {}
export interface DragState {
  top: number;
  left: number;
}

export interface DropProps {}

export function WithDrag<P extends Object> (WrappedComponent: ReactComponentLike, fixed: boolean = false) {
  return class extends React.Component<DragProps & P, DragState> {
    state: DragState = {
      top: 0,
      left: 0
    }

    startX: number = 0
    startY: number = 0

    offsetX: number = 0
    offsetY: number = 0

    div: HTMLDivElement | null = null

    BindDiv = (ref: HTMLDivElement | null) => this.div = ref

    OnDragStart = (event: React.DragEvent) => {
      this.startX = event.clientX
      this.startY = event.clientY
    }

    OnDrag = (event: React.DragEvent) => {
      this.setState({top: event.clientY - this.startY + this.offsetY, left: event.clientX - this.startX + this.offsetX})
    }

    OnDragEnd = (event: React.DragEvent) => {
      if (fixed) {
        this.offsetY += event.clientY - this.startY
        this.offsetX += event.clientX - this.startX

        this.setState({top: this.offsetY, left: this.offsetX})
      } else {
        this.setState({top: 0, left: 0})
      }
    }

    render () {
      return <div 
        className={fixed ? styles.withDraggableFixed : styles.withDraggable}
        style={this.state}
        ref={this.BindDiv}
        onDragStart={this.OnDragStart}
        onDrag={this.OnDrag}
        onDragEnd={this.OnDragEnd}
        draggable={true}
      >
        <WrappedComponent/>
      </div>
    }
  }
}

export function WithDrop<P extends Object> (WrappedComponent: ReactComponentLike) {
  return class extends React.Component<DropProps & P> {
    div: HTMLDivElement | null = null

    BindDiv = (ref: HTMLDivElement | null): void => {this.div = ref}

    OnDrop = (event: React.DragEvent): void => {
      event.preventDefault()
    }

    OnDragOver = (event: React.DragEvent): void => {
      event.preventDefault()
    }

    render () {
      return <div 
        className={styles.withDraggable} 
        ref={this.BindDiv}
        onDrop={this.OnDrop}
        onDragOver={this.OnDragOver}
      >
        <WrappedComponent/>
      </div>
    }
  }
}