import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import ScreenLoader from '../components/ScreenLoader'
import Home from '../containers/Home'
import { store } from '../redux/store'
import './style.module.scss'
import { theme } from '../common/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Home />
        <ScreenLoader />
      </Provider>
    </ThemeProvider>
  )
}

export default App
