import { useEffect, useState } from 'react'
import { useSelector } from '../redux/store'
import UtilServices from '../services/UtilService'
import { TempMeasure } from '../types'

const useTemp = (temperature: number) => {
  const unitOfMeasure = useSelector((state) => state.temperature as TempMeasure)
  const [temp, setTemp] = useState(temperature)
  useEffect(() => {
    if (unitOfMeasure === 'celsius') {
      setTemp(UtilServices.convertToCelsius(temperature))
    } else {
      setTemp(temperature)
    }
  }, [temperature, unitOfMeasure])
  return {
    tempVal: Math.ceil(temp),
    unitOfMeasure: unitOfMeasure === 'celsius' ? 'C' : 'F'
  }
}

export default useTemp
