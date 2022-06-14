import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import individualsReducer from './individualsSlice'
import alertReducer from './alertSlice'
import tagsReducer from './tagsSlice'
import coverageReducer from './coverageSlice'
import inquiryReducer from './inquiriesSlice'

const rootReducer = combineReducers({
  user: userReducer,
  individuals: individualsReducer,
  alert: alertReducer,
  tags: tagsReducer,
  coverage: coverageReducer,
  inquiries: inquiryReducer,
})

export default rootReducer
