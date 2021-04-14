import CircularProgress from '@material-ui/core/CircularProgress'
import Modal from '@material-ui/core/Modal'
import { FC } from 'react'
import styles from './style.module.scss'
import { useDispatch } from '../../redux/store'
import { useLoader } from '../../hooks/useLoader'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { loaderActions } from '../../redux/slices/loaderSlice'

interface IScreenLoader {}

const ScreenLoader: FC<IScreenLoader> = () => {
  const dispatch = useDispatch()
  const loading = useLoader()

  const onClose = () => {
    dispatch(loaderActions.loaded())
  }

  return (
    <Modal
      disableBackdropClick
      className={styles.container}
      open={loading}
      role="modal"
      onClose={onClose}>
      <div className={styles.content}>
        <Box m={2}>
          <CircularProgress
            // color={COLORS.primary}
            size="3rem"
            variant="indeterminate"
          />
        </Box>
        <Box>
          <Typography component="h1">Loading weather data...</Typography>
        </Box>
      </div>
    </Modal>
  )
}

export default ScreenLoader
