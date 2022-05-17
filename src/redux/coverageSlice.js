import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  object: null,
  id: null,
  items: [],
  error: null,
  fetchStatus: 'idle',
  getStatus: 'idle',
  updateStatus: 'idle',
  createStatus: 'idle',
}

export const fetch = createAsyncThunk(
  'coverage/fetch',
  async ({ headers, object, id }) => {
    const url = object && id ? `/${object}s/${id}/coverage` : '/coverage'
    const { data } = await client.request({
      headers,
      url,
    })
    return { data, object, id }
  }
)

export const get = createAsyncThunk('coverage/get', async ({ headers, id }) => {
  const { data } = await client.request({
    headers,
    url: `/coverage/${id}`,
  })
  return data
})

export const create = createAsyncThunk(
  'coverage/create',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/coverage`,
      method: 'POST',
      data: inputs,
    })
    return data
  }
)

export const update = createAsyncThunk(
  'coverage/update',
  async ({ headers, id, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/coverage/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return data
  }
)

export const remove = createAsyncThunk(
  'coverage/remove',
  async ({ headers, id }) => {
    await client.request({
      headers,
      url: `/coverage/${id}`,
      method: 'DELETE',
    })
    return id
  }
)

const coverageSlice = createSlice({
  name: 'coverage',
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
  },
  extraReducers: {
    [fetch.pending]: (state, action) => {
      state.fetchStatus = 'loading'
    },
    [fetch.fulfilled]: (state, action) => {
      state.fetchStatus = 'idle'
      state.items = action.payload.data
      state.object = action.payload.object
      state.id = action.payload.id
    },
    [fetch.rejected]: (state, action) => {
      state.fetchStatus = 'failed'
      state.error = action.error.message
    },
    [get.pending]: (state, action) => {
      state.getStatus = 'loading'
    },
    [get.fulfilled]: (state, action) => {
      state.getStatus = 'succeeded'
      state.items = [action.payload, ...state.items]
    },
    [get.rejected]: (state, action) => {
      state.getStatus = 'failed'
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
      if (matchingIndex !== -1) {
        const newItems = state.items
        newItems[matchingIndex] = updatedItem
        state.items = newItems.filter(item => !item.isRemoved)
      }
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

export const { set, clear, setFilter } = coverageSlice.actions

export default coverageSlice.reducer
