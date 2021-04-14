import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppselector } from 'react-redux'
import { loaderSlice } from '../slices/loaderSlice'
import { weatherSlice } from '../slices/weatherSlice'
import { tempSlice } from '../slices/temperatureSlice'

const rootReducer = combineReducers({
  [weatherSlice.name]: weatherSlice.reducer,
  [loaderSlice.name]: loaderSlice.reducer,
  [tempSlice.name]: tempSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})

type AppState = ReturnType<typeof rootReducer>

type AppDispatch = typeof store.dispatch

export const useDispatch = () => useAppDispatch<AppDispatch>()

export const useSelector: TypedUseSelectorHook<AppState> = useAppselector
