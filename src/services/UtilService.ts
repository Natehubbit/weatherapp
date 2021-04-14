import moment from 'moment'
import { GraphData, TempMeasure, WeatherInfo } from '../types'

export default class UtilServices {
  static kelvinToFahrenheit (val:number) {
    return (val - 273.1) * 9.5 + 32
  }

  static convertToCelsius (val: number) {
    return val ? (val - 32) / 1.8 : 0
  }

  static convertToFahrenheit (val: number) {
    return val ? val * 1.8 + 32 : 0
  }

  static formatUnixDate (dt: number) {
    return moment.unix(dt).format('DD MMMM YYYY')
  }

  static getDate (date: string) {
    return moment(date).format('ddd, MMM DD')
  }

  static getTime (date:number) {
    return moment.unix(date).format('hh:mm')
  }

  static formatCardData (data: WeatherInfo[]) {
    try {
      let accIdx = 0
      const refinedData: WeatherInfo[] = []
      const hasData = data.length > 0
      if (hasData) {
        data.reduce((acc, curr, idx) => {
          const date1 = this.getDate(curr.dt_txt)
          const date2 = this.getDate(acc.dt_txt)
          if (date1 === date2) {
            const update: WeatherInfo = {
              ...curr,
              temp: idx === 0 ? curr.temp : acc.temp + curr.temp
            }
            refinedData[accIdx] = update
            return update
          } else {
            accIdx++
            refinedData.push(curr)
            return curr
          }
        }, data[0])
        return refinedData.map((refData) => {
          const { length } = data.filter(
            (d) =>
              this.getDate(d.dt_txt) ===
              this.getDate(refData.dt_txt)
          )
          return {
            ...refData,
            temp: refData.temp / length
          }
        })
      }
      return []
    } catch (e) {
      console.log(e.message)
      return []
    }
  }

  static formatGraphData (
    id: number | null,
    data: WeatherInfo[],
    unitOfMeasure: TempMeasure
  ): GraphData[]|null {
    try {
      if (!data || !id) throw new Error('No data available')
      const date = this.formatUnixDate(id)
      const filtered = data.filter((d) => UtilServices
        .formatUnixDate(d.id) === date)
      const isCelsius = unitOfMeasure === 'celsius'
      return filtered.map(d => {
        const val = isCelsius
          ? UtilServices.convertToCelsius(d.temp)
          : UtilServices.convertToFahrenheit(d.temp)
        return {
          name: `${Math.ceil(val)}${isCelsius ? 'C' : 'F'}`,
          value: val
        }
      })
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}
