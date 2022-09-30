import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import individualsReducer from './individualsSlice'
import alertReducer from './alertSlice'
import tagsReducer from './tagsSlice'
import coverageReducer from './coverageSlice'
import contentReducer from './contentSlice'
import contentTypesReducer from './contentTypesSlice'
import questionsReducer from './questionsSlice'
import inquiryReducer from './inquiriesSlice'
import organizationsReducer from './organizationsSlice'
import industriesReducer from './industriesSlice'
import historyReducer from './historySlice'
import usersReducer from './usersSlice'

const rootReducer = combineReducers({
  user: userReducer,
  individuals: individualsReducer,
  organizations: organizationsReducer,
  users: usersReducer,
  alert: alertReducer,
  tags: tagsReducer,
  coverage: coverageReducer,
  content: contentReducer,
  contentTypes: contentTypesReducer,
  questions: questionsReducer,
  inquiries: inquiryReducer,
  industries: industriesReducer,
  history: historyReducer,
})

export default rootReducer
