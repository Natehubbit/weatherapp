import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import ScreenLoader from '..'
import { loaderActions } from '../../../redux/slices/loaderSlice'
import { store } from '../../../redux/store'

describe('<ScreenLoader/>', () => {
  it('renders when loading and disappears when loaded', async () => {
    store.dispatch(loaderActions.loading())
    const { queryByRole } = render(
      <Provider store={store}>
        <ScreenLoader />
      </Provider>
    )
    expect(queryByRole('modal')).toBeTruthy()

    store.dispatch(loaderActions.loaded())
    const { loader } = store.getState()
    expect(loader).toBe(false)
    const modal = queryByRole('modal')
    expect(modal).toBeNull()
  })
})
