import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import individualsReducer from './individualsSlice'
import alertReducer from './alertSlice'
import tagReducer from './tagSlice'

const rootReducer = combineReducers({
  user: userReducer,
  individuals: individualsReducer,
  alert: alertReducer,
  tag: tagReducer,
})

export default rootReducer
