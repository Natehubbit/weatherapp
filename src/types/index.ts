
export type TempMeasure = 'celsius'|'fahrenheit'

export interface WeatherInfo {
  id:number;
  weather: string;
  dt_txt: string;
  temp: number;
}

export interface GraphData {
  name: string;
  value: number;
}