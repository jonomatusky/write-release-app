import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  items: [],
  error: null,
  getStatus: 'idle',
  fetchStatus: 'idle',
  updateStatus: 'idle',
  createStatus: 'idle',
  getCoverageStatus: 'idle',
}

export const fetch = createAsyncThunk(
  'organizations/fetch',
  async ({ headers }) => {
    const { data } = await client.request({
      headers,
      url: '/organizations',
    })
    return data
  }
)

export const get = createAsyncThunk(
  'organizations/get',
  async ({ headers, id }) => {
    const { data } = await client.request({
      headers,
      url: '/organizations/' + id,
    })
    return data
  }
)

export const create = createAsyncThunk(
  'organizations/create',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/organizations`,
      method: 'POST',
      data: inputs,
    })
    return data
  }
)

export const update = createAsyncThunk(
  'organizations/update',
  async ({ headers, id, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/organizations/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return data
  }
)

export const remove = createAsyncThunk(
  'organizations/remove',
  async ({ headers, id }) => {
    await client.request({
      headers,
      url: `/organizations/${id}`,
      method: 'DELETE',
    })
    return id
  }
)

export const getCoverage = createAsyncThunk(
  'organizations/getCoverage',
  async ({ headers, id }) => {
    const { data } = await client.request({
      headers,
      url: `/organizations/${id}/coverage`,
    })
    return data
  }
)

const organizationsSlice = createSlice({
  name: 'organizations',
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
    setLogo(state, action) {
      const { id, logoUrl } = action.payload
      let organizations = state.items
      const index = organizations.findIndex(item => item.id === id)
      organizations[index].logoUrl = logoUrl
      state.items = organizations
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
    [get.pending]: (state, action) => {
      state.getStatus = 'loading'
    },
    [get.fulfilled]: (state, action) => {
      const newItems = state.items
      const newItem = action.payload
      const matchingIndex = state.items.findIndex(
        item => item.id === newItem.id
      )
      if (matchingIndex === -1) {
        newItems.push(newItem)
      } else {
        newItems[matchingIndex] = newItem
      }
      state.items = newItems
      state.getStatus = 'succeeded'
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
      const newItems = state.items
      const existingItem = newItems[matchingIndex]
      const logoUrl =
        updatedItem.logo === existingItem.logo ? existingItem.logoUrl : null
      newItems[matchingIndex] = { ...updatedItem, logoUrl }
      state.items = newItems.filter(item => !item.isRemoved)
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
    [getCoverage.pending]: (state, action) => {
      state.getCoverageStatus = 'loading'
    },
    [getCoverage.fulfilled]: (state, action) => {
      state.getCoverageStatus = 'idle'
      const { id, coverage } = action.payload
      const matchingIndex = state.items.findIndex(item => item.id === id)
      const newItems = state.items
      newItems[matchingIndex].coverage = coverage
      state.items = newItems
    },
    [getCoverage.rejected]: (state, action) => {
      state.getCoverageStatus = 'failed'
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

export const { set, clear, setFilter, setLogo } = organizationsSlice.actions

export default organizationsSlice.reducer
