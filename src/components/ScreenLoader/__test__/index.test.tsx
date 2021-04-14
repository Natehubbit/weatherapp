import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import ScreenLoader from '..'
import { loaderActions } from '../../../redux/slices/loaderSlice'
import { store } from '../../../redux/store'

describe('<ScreenLoader/>', () => {
  it('renders without crashing when loading', () => {
    store.dispatch(loaderActions.loading())
    const { getByText } = render(
      <Provider store={store} >
        <ScreenLoader/>
      </Provider>
    )
    expect(getByText('Loading weather data...')).toBeInTheDocument()
  })
  it('does not render when data is done loading', async () => {
    store.dispatch(loaderActions.loading())
    const { queryByRole } = render(
      <Provider store={store} >
        <ScreenLoader/>
      </Provider>
    )
    store.dispatch(loaderActions.loaded())
    const { loader } = store.getState()
    expect(loader).toBe(false)
    const modal = queryByRole('modal')
    expect(modal).toBeNull()
  })
})
