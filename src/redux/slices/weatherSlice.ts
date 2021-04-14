import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import WeatherService from '../../services/WeatherService'
import { WeatherInfo } from '../../types'
import { loaderActions } from './loaderSlice'

const initialState: WeatherInfo[] = []

export const { actions, ...weatherSlice } = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getData(_, { payload }: PayloadAction<WeatherInfo[]>) {
      return payload
    }
  }
})

const fetchData = () => async (dispatch: Dispatch) => {
  dispatch(loaderActions.loading())
  const data = await WeatherService.getData()
  if (data) {
    dispatch(actions.getData(data))
  }
  dispatch(loaderActions.loaded())
}

export const weatherActions = {
  ...actions,
  fetchData
}
