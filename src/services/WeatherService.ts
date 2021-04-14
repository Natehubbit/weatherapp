import axios from 'axios'
import { WeatherInfo } from '../types'
import UtilServices from './UtilService'

const URL = 'https://api.openweathermap.org/data/2.5/forecast'

export default class WeatherService {
  static async getData(): Promise<WeatherInfo[] | null> {
    try {
      const res = await axios.get(URL, {
        params: {
          q: 'Munich,de',
          cnt: 40,
          APPID: process.env.REACT_APP_WEATHER_API_ID
        }
      })
      return res.data.list.map((d: any) => {
        return {
          id: d.dt,
          dt_txt: d.dt_txt,
          temp: UtilServices.kelvinToFahrenheit(d.main.temp),
          weather: d.weather[0].main.toLowerCase()
        }
      })
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}
