import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../util/client'

let initialState = {
  item: {},
  fetchStatus: 'idle',
  updateStatus: 'idle',
  error: null,
}

export const fetch = createAsyncThunk('user/fetch', async ({ headers }) => {
  const { data } = await client.request({
    headers,
    url: '/me',
  })
  return data
})

export const update = createAsyncThunk(
  'user/update',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/me`,
      method: 'PATCH',
      data: inputs,
    })
    return data
  }
)

export const remove = createAsyncThunk('user/remove', async ({ headers }) => {
  await client.request({
    headers,
    url: '/me',
    method: 'DELETE',
  })
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clear(state) {
      state.fetchStatus = 'idle'
      state.createStatus = 'idle'
      state.updateStatus = 'idle'
      state.user = {}
      state.error = null
    },
  },
  extraReducers: {
    [fetch.pending]: (state, action) => {
      state.fetchStatus = 'loading'
    },
    [fetch.fulfilled]: (state, action) => {
      state.fetchStatus = 'succeeded'
      state.item = action.payload
    },
    [fetch.rejected]: (state, action) => {
      state.fetchStatus = 'failed'
      state.error = action.error.message
      state.scanRoute = '/'
    },
    [update.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [update.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      state.user = action.payload
    },
    [update.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
  },
})

export const { set, clear } = userSlice.actions

export default userSlice.reducer
