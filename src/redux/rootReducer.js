import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import individualsReducer from './individualsSlice'
import alertReducer from './alertSlice'
import tagsReducer from './tagsSlice'
import coverageReducer from './coverageSlice'
import inquiryReducer from './inquiriesSlice'
import organizationsReducer from './organizationsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  individuals: individualsReducer,
  organizations: organizationsReducer,
  alert: alertReducer,
  tags: tagsReducer,
  coverage: coverageReducer,
  inquiries: inquiryReducer,
})

export default rootReducer
