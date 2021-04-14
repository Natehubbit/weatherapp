import Grid from '@material-ui/core/Grid'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import styles from './style.module.scss'
import Fab from '@material-ui/core/Fab'
import { FC } from 'react'

interface NavButtonsProps {
  endOfList: boolean;
  startOfList: boolean;
  onNext: () => void;
  onPrev: () => void;
}

const NavButtons: FC<NavButtonsProps> = ({
  endOfList,
  startOfList,
  onNext,
  onPrev
}) => {
  return (
    <Grid
      container
      className={styles['container']}
    >
      <Grid
        item
      >
        {!startOfList&&<Fab role='left' onClick={onPrev} classes={{label:styles['label']}} className={styles['fab']}>
          <ArrowLeft className={styles['icon']} />
        </Fab>}
      </Grid>
      <Grid
        item
      >
        {!endOfList&&<Fab role='right' onClick={onNext} classes={{label:styles['label']}} className={styles['fab']}>
          <ArrowRight className={styles['icon']} />
        </Fab>}
      </Grid>
    </Grid>
  )
}

export default NavButtons
