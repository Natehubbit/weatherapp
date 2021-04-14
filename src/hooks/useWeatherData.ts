import { useSelector } from '../redux/store'
import UtilServices from '../services/UtilService'

export const useWeatherData = (start?: number, end?: number) =>
  useSelector(({ weather }) => {
    const data = UtilServices.formatCardData(weather)
    const size = data.length
    if (end !== undefined && start !== undefined && size) {
      return {
        data: data.slice(start, end),
        size,
        endOfList: end >= size
      }
    }
    return {
      data: weather,
      size,
      endOfList: true
    }
  })
