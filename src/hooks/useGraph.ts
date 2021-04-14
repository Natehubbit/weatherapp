import { useEffect, useState } from 'react'
import { useSelector } from '../redux/store'
import UtilServices from '../services/UtilService'
import { GraphData, TempMeasure } from '../types'
import { useWeatherData } from './useWeatherData'

const useGraph = (date:number|null) => {
  const { data } = useWeatherData()
  const unitOfMeasure = useSelector(state => state.temperature as TempMeasure)
  const [graph, setGraph] = useState<GraphData[]>([])
  useEffect(() => {
    if (date) {
      const graphData = UtilServices
        .formatGraphData(date,data,unitOfMeasure)
      graphData && setGraph(graphData)
    }
  }, [date,unitOfMeasure,data])
  return {
    graph
  }
}

export default useGraph
