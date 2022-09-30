import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  items: [],
  error: null,
  fetchStatus: 'idle',
}

export const fetch = createAsyncThunk('users/fetch', async ({ headers }) => {
  const { data } = await client.request({
    headers,
    url: '/users',
  })
  return data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clear(state, action) {
      state.items = []
      state.error = null
      state.fetchStatus = 'idle'
    },
  },
  extraReducers: {
    [fetch.pending]: (state, action) => {
      state.fetchStatus = 'loading'
    },
    [fetch.fulfilled]: (state, action) => {
      state.fetchStatus = 'succeeded'
      state.items = action.payload
    },
    [fetch.rejected]: (state, action) => {
      state.fetchStatus = 'failed'
      state.error = action.error.message
    },
  },
})

export const { clear } = usersSlice.actions

export default usersSlice.reducer
