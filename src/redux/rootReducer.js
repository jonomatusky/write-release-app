import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertReducer from './alertSlice'
import contentReducer from './contentSlice'
import contentTypesReducer from './contentTypesSlice'
import tonesReducer from './tonesSlice'
import historyReducer from './historySlice'

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  content: contentReducer,
  contentTypes: contentTypesReducer,
  tones: tonesReducer,
  history: historyReducer,
})

export default rootReducer
