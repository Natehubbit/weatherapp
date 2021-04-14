import { render } from '@testing-library/react'
import Graph from '..'
import { Provider } from 'react-redux'
import { store } from '../../../redux/store'
import axios from 'axios'
import { weatherActions } from '../../../redux/slices/weatherSlice'
import MockService from '../../../services/MockService'

MockService.initialize()

describe('<Graph/>', () => {
  it('renders without crashing when weather card is not selected', () => {
    const date = null
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <Graph date={date} />
      </Provider>)
    const noData = getByTestId('noData')
    const graph = queryByTestId('graph')
    expect(noData).toBeInTheDocument()
    expect(graph).toBeNull()
  })

  it('renders graph data when weather card has been selected', async () => {
    const date = 1618250400
    const { data } = await axios.get('/weather')
    store.dispatch(weatherActions.getData(data))
    const { queryByTestId, container } = render(
      <Provider store={store}>
        <Graph date={date} />
      </Provider>)
    expect(container.getElementsByClassName('graphContainer').length).toBe(1)
    const noData = queryByTestId('noData')
    expect(noData).toBeNull()
  })
})
