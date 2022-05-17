import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import individualsReducer from './individualsSlice'
import alertReducer from './alertSlice'
import tagsReducer from './tagsSlice'
import coverageReducer from './coverageSlice'

const rootReducer = combineReducers({
  user: userReducer,
  individuals: individualsReducer,
  alert: alertReducer,
  tags: tagsReducer,
  coverage: coverageReducer,
})

export default rootReducer
