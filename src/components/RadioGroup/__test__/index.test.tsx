import { fireEvent, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import RadioGroup from '..'
import { TEMPERATURE_OPTIONS } from '../../../common/constants'
import { store } from '../../../redux/store'
import MockService from '../../../services/MockService'

MockService.initialize()

describe('<RadioGroup/>', () => {
  it('renders radio buttons and clicks on them to update temperature', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RadioGroup options={TEMPERATURE_OPTIONS} />
      </Provider>
    )
    Object.keys(TEMPERATURE_OPTIONS).forEach((k) => {
      const key = k as keyof typeof TEMPERATURE_OPTIONS
      const btn = getByTestId(key)
      fireEvent.click(btn)
      const { temperature } = store.getState()
      expect(temperature).toBe(k.toLowerCase())
    })
  })
})
