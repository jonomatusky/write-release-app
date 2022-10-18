import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  // object: null,
  id: null,
  items: [],
  error: null,
  fetchStatus: 'idle',
  getStatus: 'idle',
  updateStatus: 'idle',
  createStatus: 'idle',
}

export const fetch = createAsyncThunk(
  'resources/fetch',
  async ({ headers, object, id }) => {
    const url = object && id ? `/${object}s/${id}/resources` : '/resources'
    const { data } = await client.request({
      headers,
      url,
    })
    return { data, object, id }
  }
)

export const get = createAsyncThunk(
  'resources/get',
  async ({ headers, id }) => {
    const { data } = await client.request({
      headers,
      url: `/resources/${id}`,
    })
    return data
  }
)

export const create = createAsyncThunk(
  'resources/create',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/resources`,
      method: 'POST',
      data: inputs,
    })
    return data
  }
)

export const update = createAsyncThunk(
  'resources/update',
  async ({ headers, id, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/resources/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return data
  }
)

export const remove = createAsyncThunk(
  'resources/remove',
  async ({ headers, id }) => {
    await client.request({
      headers,
      url: `/resources/${id}`,
      method: 'DELETE',
    })
    return id
  }
)

const resourcesSlice = createSlice({
  name: 'resources',
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
      const newItems = [...state.items]
      newItems.push(action.payload)
      const uniqueItems = Array.from(new Set(newItems.map(a => a.id))).map(
        id => {
          return newItems.find(a => a.id === id)
        }
      )
      state.items = uniqueItems
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

export const { set, clear, setFilter } = resourcesSlice.actions

export default resourcesSlice.reducer
