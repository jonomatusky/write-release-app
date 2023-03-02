import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  items: [],
  error: null,
  fetchStatus: 'idle',
  updateStatus: 'idle',
  createStatus: 'idle',
}

export const fetch = createAsyncThunk('tones/fetch', async ({ headers }) => {
  const { data } = await client.request({
    headers,
    url: '/tones',
  })
  return data
})

export const create = createAsyncThunk(
  'tones/create',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/tones`,
      method: 'POST',
      data: inputs,
    })
    return data
  }
)

export const update = createAsyncThunk(
  'tones/update',
  async ({ headers, id, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/tones/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return data
  }
)

export const remove = createAsyncThunk(
  'tones/remove',
  async ({ headers, id }) => {
    await client.request({
      headers,
      url: `/tones/${id}`,
      method: 'DELETE',
    })
    return id
  }
)

const tonesSlice = createSlice({
  name: 'tones',
  initialState,
  reducers: {
    set(state, action) {
      const { data } = action.payload
      state.items = data
    },
    clear(state, action) {
      state.items = []
      state.error = null
      state.fetchStatus = 'idle'
      state.updateStatus = 'idle'
      state.createStatus = 'idle'
    },
    setFilter(state, action) {
      state.filter = action.payload
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
    [update.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [update.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      const updatedItem = action.payload
      const matchingIndex = state.items.findIndex(
        item => item.id === updatedItem.id
      )
      const newItems = state.items
      newItems[matchingIndex] = updatedItem
      state.items = newItems
    },
    [update.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
    [create.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [create.fulfilled]: (state, action) => {
      state.createStatus = 'idle'
      const item = action.payload
      state.items = [item, ...state.items]
    },
    [create.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },

    [remove.fulfilled]: (state, action) => {
      const id = action.payload
      const matchingIndex = state.items.findIndex(item => item.id === id)

      if (matchingIndex >= 0) {
        state.items = [
          ...state.items.slice(0, matchingIndex),
          ...state.items.slice(matchingIndex + 1),
        ]
      }
    },
  },
})

export const { set, clear, setFilter } = tonesSlice.actions

export default tonesSlice.reducer
