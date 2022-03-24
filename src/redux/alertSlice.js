import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  message: null,
  error: null,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = (action.payload || {}).message
    },
    setError(state, action) {
      state.error = (action.payload || {}).message
    },
  },
})

export const { setMessage, setError } = alertSlice.actions

export default alertSlice.reducer
