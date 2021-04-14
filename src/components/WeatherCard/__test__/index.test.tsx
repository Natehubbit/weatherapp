import { fireEvent, render } from '@testing-library/react'
import axios from 'axios'
import { Provider } from 'react-redux'
import WeatherCard from '..'
import { store } from '../../../redux/store'
import { weatherActions } from '../../../redux/slices/weatherSlice'
import { WeatherInfo } from '../../../types'
import MockService from '../../../services/MockService'

MockService.initialize()

describe('<WeatherCard />', () => {
  it('renders and clicks on card', async () => {
    const { data }:{data:WeatherInfo[]} = await axios.get('/weather')
    const { id } = data[0]
    store.dispatch(weatherActions.getData(data))
    const { getByTestId } = render(
      <Provider store={store}>
        <WeatherCard
          date={data[0].dt_txt}
          id={data[0].id}
          activeId={id}
          temp={data[0].temp}
        />
      </Provider>
    )
    const card = getByTestId('weatherCard')
    fireEvent.click(card)
    const isActive = card.className.includes('active')
    expect(isActive).toBe(true)
  })
})
