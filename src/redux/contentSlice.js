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
  getByOrganizationStatus: 'idle',
}

export const fetch = createAsyncThunk('contents/fetch', async ({ headers }) => {
  const { data } = await client.request({
    headers,
    // url: '/me/content',
    url: '/me/contents',
  })
  return data
})

export const get = createAsyncThunk('contents/get', async ({ headers, id }) => {
  const { data } = await client.request({
    headers,
    url: '/contents/' + id,
  })
  return data
})

export const getByOrganization = createAsyncThunk(
  'contents/getByOrganization',
  async ({ headers, id }) => {
    const { data } = await client.request({
      headers,
      url: '/organizations/' + id + '/contents',
    })
    return data
  }
)

export const create = createAsyncThunk(
  'contents/create',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/contents`,
      method: 'POST',
      data: inputs,
    })
    return data
  }
)

export const update = createAsyncThunk(
  'contents/update',
  async ({ headers, id, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/contents/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return data
  }
)

export const remove = createAsyncThunk(
  'contents/remove',
  async ({ headers, id }) => {
    await client.request({
      headers,
      url: `/contents/${id}`,
      method: 'DELETE',
    })
    return id
  }
)

export const getCoverage = createAsyncThunk(
  'contents/getCoverage',
  async ({ headers, id }) => {
    const { data } = await client.request({
      headers,
      url: `/contents/${id}/coverage`,
    })
    return data
  }
)

// export const getResources = createAsyncThunk(
//   'contents/getResources',
//   async ({ headers, id }) => {
//     const { data } = await client.request({
//       headers,
//       url: `/contents/${id}/resources`,
//     })
//     return data
//   }
// )

const contentsSlice = createSlice({
  name: 'contents',
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
    setAvatar(state, action) {
      const { id, avatarUrl } = action.payload
      let contents = state.items
      const index = contents.findIndex(item => item.id === id)
      contents[index].avatarUrl = avatarUrl
      state.items = contents
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
    [getByOrganization.pending]: (state, action) => {
      state.getByOrganizationStatus = 'loading'
    },
    [getByOrganization.fulfilled]: (state, action) => {
      const newItems = [...state.items]
      newItems.push(...action.payload)
      const uniqueItems = Array.from(new Set(newItems.map(a => a.id))).map(
        id => {
          return newItems.find(a => a.id === id)
        }
      )
      state.items = uniqueItems
      state.getByOrganizationStatus = 'succeeded'
    },
    [getByOrganization.rejected]: (state, action) => {
      state.getByOrganizationStatus = 'failed'
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
      const avatarUrl =
        updatedItem.avatar === existingItem.avatar
          ? existingItem.avatarUrl
          : null
      newItems[matchingIndex] = { ...updatedItem, avatarUrl }
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

export const { set, clear, setFilter, setAvatar } = contentsSlice.actions

export default contentsSlice.reducer
