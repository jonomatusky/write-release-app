import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  items: [],
  error: null,
  fetchStatus: 'idle',
  updateStatus: 'idle',
  createStatus: 'idle',
}

export const fetch = createAsyncThunk(
  'questions/fetch',
  async ({ headers }) => {
    const { data } = await client.request({
      headers,
      url: '/questions',
    })
    return data
  }
)

export const create = createAsyncThunk(
  'questions/create',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/questions`,
      method: 'POST',
      data: inputs,
    })
    return data
  }
)

export const update = createAsyncThunk(
  'questions/update',
  async ({ headers, id, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/questions/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return data
  }
)

export const remove = createAsyncThunk(
  'questions/remove',
  async ({ headers, id }) => {
    await client.request({
      headers,
      url: `/questions/${id}`,
      method: 'DELETE',
    })
    return id
  }
)

const questionsSlice = createSlice({
  name: 'questions',
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

export const { set, clear, setFilter } = questionsSlice.actions

export default questionsSlice.reducer
