import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  entityId: null,
  entityType: null,
  createStatus: 'idle',
  error: null,
}

export const create = createAsyncThunk(
  'inquiries/create',
  async ({ headers, ...inputs }) => {
    const { data } = await client.request({
      headers,
      url: `/inquiries`,
      method: 'POST',
      data: inputs,
    })
    return data
  }
)

const inquirySlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    setEntity(state, action) {
      state.entityId = (action.payload || {}).entityId
      state.entityType = (action.payload || {}).entityType
    },
  },
  extraReducers: {
    [create.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [create.fulfilled]: (state, action) => {
      state.createStatus = 'idle'
    },
    [create.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
  },
})

export const { setEntity, setIsOpen } = inquirySlice.actions

export default inquirySlice.reducer
