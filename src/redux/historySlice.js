import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  history: [],
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    add(state, action) {
      const newHistory = [...state.history]
      newHistory.push(action.payload)
      state.history = newHistory
    },
  },
})

export const { add } = historySlice.actions

export default historySlice.reducer
