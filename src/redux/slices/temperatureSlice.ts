import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TempMeasure } from '../../types'

const initialState = 'fahrenheit'

export const { actions, ...tempSlice } = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    setMeasure (
      _,
      { payload }: PayloadAction<TempMeasure>
    ): TempMeasure {
      return payload
    }
  }
})

export const tempActions = {
  ...actions
}
