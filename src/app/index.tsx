import { Provider } from 'react-redux'
import ScreenLoader from '../components/ScreenLoader'
import Home from '../containers/Home'
import { store } from '../redux/store'
import './style.module.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Home />
      <ScreenLoader />
    </Provider>
  )
}

export default App
