import { createMuiTheme } from '@material-ui/core'
import { COLORS } from './colors'

export const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      main: COLORS.primary
    }
  }
})
