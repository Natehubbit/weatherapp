import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { v4 as uuid } from 'uuid'
import { TEMPERATURE_OPTIONS } from '../../common/constants'
import RadioGroup from '../../components/RadioGroup'
import WeatherCard from '../../components/WeatherCard'
import styles from './style.module.scss'
import { useWeatherData } from '../../hooks/useWeatherData'
import { useCallback, useEffect, useState } from 'react'
import NavButtons from '../../components/NavButtons'
import { WeatherInfo } from '../../types'
import Graph from '../../components/Graph'
import { weatherActions } from '../../redux/slices/weatherSlice'
import { useDispatch } from '../../redux/store'
import { Button } from '@material-ui/core'
import { useMedia } from '../../hooks/useMedia'

const Home = () => {
  const dispatch = useDispatch()
  const { isMobile } = useMedia()
  const [start, setStart] = useState(2)
  const [end, setEnd] = useState(3)
  const [active, setActive] = useState<number | null>(null)
  const { data, size, endOfList } = useWeatherData(start, end)

  useEffect(() => {
    dispatch(weatherActions.fetchData())
  }, [dispatch])

  useEffect(() => {
    !isMobile
      ? setStart(0)
      : setStart(2)
  }, [isMobile])

  // useEffect(() => {
  // }, [start])

  const onRefresh = () => {
    dispatch(weatherActions.fetchData())
  }

  const onNext = () => {
    setStart((s) => {
      if (s >= size - 3) {
        return s
      }
      return s + 3
    })
    setEnd((e) => {
      if (e > size - 1) {
        return e
      }
      return e + 3
    })
  }
  const onPrev = () => {
    setStart((s) => {
      if (s <= 0) {
        return s
      }
      return s - 3
    })
    setEnd((e) => {
      if (e <= 3) {
        return e
      }
      return e - 3
    })
  }
  const onSelectCard = (id: number) => {
    if (id === active) {
      return setActive(null)
    }
    return setActive(id)
  }

  return (
    <div className={styles.container}>
      <Container>
        <Box display="flex" justifyContent="space-between" paddingY={5}>
          <RadioGroup
            active={Object.keys(TEMPERATURE_OPTIONS)[1]}
            options={TEMPERATURE_OPTIONS}
          />
          <Button className={styles.refreshBtn} title='Refresh' onClick={onRefresh} >
            Refresh
          </Button>
        </Box>
        <Box paddingY={5}>
          <NavButtons
            onNext={onNext}
            onPrev={onPrev}
            endOfList={endOfList}
            startOfList={start === 0}
          />
        </Box>
        <Box paddingY={5}>
          <Grid container spacing={3} className={styles.cardList}>
            {data.map((d: WeatherInfo, index) => (
              <WeatherCard
                id={d.id}
                activeId={active}
                key={uuid()}
                date={d?.dt_txt}
                temp={d?.temp}
                onClick={() => onSelectCard(d.id)}
              />
            ))}
          </Grid>
          <Grid container>
            <Graph date={active} />
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Home
