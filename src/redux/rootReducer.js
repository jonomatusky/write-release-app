import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import individualsReducer from './individualsSlice'
import alertReducer from './alertSlice'
import tagsReducer from './tagsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  individuals: individualsReducer,
  alert: alertReducer,
  tags: tagsReducer,
})

export default rootReducer
