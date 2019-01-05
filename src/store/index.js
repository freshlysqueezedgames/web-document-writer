// @flow

import * as Redux from 'redux'
import {createStore} from 'redux'

import {
  EditorReducer
} from './reducers'

export const store: Redux.Store = createStore(EditorReducer)