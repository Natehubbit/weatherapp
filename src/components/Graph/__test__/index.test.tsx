import { render } from '@testing-library/react'
import Graph from '..'
import { Provider } from 'react-redux'
import { store } from '../../../redux/store'
import axios from 'axios'
import { weatherActions } from '../../../redux/slices/weatherSlice'
import MockService from '../../../services/MockService'
import { WeatherInfo } from '../../../types'

MockService.initialize()

describe('<Graph/>', () => {
  it('does not render when weather card is not selected', () => {
    const date = null
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <Graph date={date} />
      </Provider>
    )
    const noData = getByTestId('noData')
    const graph = queryByTestId('graph')
    expect(noData).toBeTruthy()
    expect(graph).toBeNull()
  })

  it('renders when weather card has been selected', async () => {
    const {
      data
    }: {
      data: WeatherInfo[]
    } = await axios.get('/weather')
    const { id: date } = data[0]
    store.dispatch(weatherActions.getData(data))
    const { queryByTestId } = render(
      <Provider store={store}>
        <Graph date={date} />
      </Provider>
    )
    expect(queryByTestId('graph')).toBeTruthy()
    expect(queryByTestId('noData')).toBeNull()
  })
})
