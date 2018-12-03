// @flow

import * as Redux from 'redux'
import {createStore} from 'redux'

import {
  DocumentReducer
} from './reducers'

export const store: Redux.Store = createStore(DocumentReducer)