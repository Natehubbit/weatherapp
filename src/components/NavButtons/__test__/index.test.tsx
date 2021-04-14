import { render } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { Provider } from 'react-redux'
import NavButtons from '..'
import { weatherActions } from '../../../redux/slices/weatherSlice'
import { store } from '../../../redux/store'
import MockService from '../../../services/MockService'

MockService.initialize()

describe('<NavButtons/>',()=>{
  it('renders right button only when item is on next page.',async()=>{
    const onClick = jest.fn()
    const { data } = await axios.get('/weather')
    store.dispatch(weatherActions.getData(data))
    const {getByRole,queryByRole} = render(
      <Provider store={store}>
        <NavButtons
          onNext={onClick}
          onPrev={onClick}
          endOfList={false}
          startOfList={true}
        />
      </Provider>)
    const rightBtn = getByRole('right')
    expect(rightBtn).toBeTruthy()
    expect(queryByRole('left')).toBeNull()
  })
  it('renders left button only when an item is on previous page and not the next',async()=>{
    const onClick = jest.fn()
    const { data } = await axios.get('/weather')
    store.dispatch(weatherActions.getData(data))
    const { queryByRole } = render(
      <Provider store={store}>
        <NavButtons
          onNext={onClick}
          onPrev={onClick}
          endOfList={true}
          startOfList={false}
        />
      </Provider>)
    expect(queryByRole('left')).toBeTruthy()
    expect(queryByRole('right')).toBeNull()
  })
  it('renders none of the buttons whe page size is 1',async()=>{
    const onClick = jest.fn()
    const { data } = await axios.get('/weather')
    store.dispatch(weatherActions.getData(data))
    const { queryByRole } = render(
      <Provider store={store}>
        <NavButtons
          onNext={onClick}
          onPrev={onClick}
          endOfList={true}
          startOfList={true}
        />
      </Provider>)
    expect(queryByRole('left')).toBeNull()
    expect(queryByRole('right')).toBeNull()
  })
})