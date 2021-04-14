import styles from './style.module.scss'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { FC } from 'react'
import { v4 as uuid } from 'uuid'
import cx from 'classnames/bind'
import useTemp from '../../hooks/useTemp'
import UtilServices from '../../services/UtilService'

const cn = cx.bind(styles)

interface IWeatherCard {
  id: number
  temp: number
  date: string
  activeId?: number | null
  onClick?: () => void
}

const WeatherCard: FC<IWeatherCard> = ({
  id,
  temp,
  date,
  activeId,
  onClick
}) => {
  const { tempVal, unitOfMeasure } = useTemp(temp)
  return (
    <Grid
      key={uuid()}
      item
      xs={12}
      sm={6}
      lg={4}
      className={cn({
        grid: true
      })}>
      <Card
        data-testid="weatherCard"
        className={cn({
          container: true,
          grid: true,
          active: activeId === id
        })}
        onClick={onClick}>
        <CardContent className={styles.content}>
          <div className={styles.item}>
            <Typography className={styles.head} component="header">
              TEMP
            </Typography>
            <Typography className={styles.value} component="span">
              {tempVal}
              {unitOfMeasure}
            </Typography>
          </div>
          <div className={styles.item}>
            <Typography className={styles.head} component="header">
              DATE
            </Typography>
            <Typography className={styles.value} component="span">
              {UtilServices.getDate(date)}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default WeatherCard
