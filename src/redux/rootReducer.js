import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import individualsReducer from './individualsSlice'
import alertReducer from './alertSlice'
import tagsReducer from './tagsSlice'
import coverageReducer from './coverageSlice'
import inquiryReducer from './inquiriesSlice'
import organizationsReducer from './organizationsSlice'
import industriesReducer from './industriesSlice'
import historyReducer from './historySlice'

const rootReducer = combineReducers({
  user: userReducer,
  individuals: individualsReducer,
  organizations: organizationsReducer,
  alert: alertReducer,
  tags: tagsReducer,
  coverage: coverageReducer,
  inquiries: inquiryReducer,
  industries: industriesReducer,
  history: historyReducer,
})

export default rootReducer
