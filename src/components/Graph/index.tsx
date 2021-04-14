import styles from './style.module.scss'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts'
import { FC } from 'react'
import useGraph from '../../hooks/useGraph'
import { COLORS } from '../../common/colors'

interface GraphProps {
  date: number | null
}

const Graph: FC<GraphProps> = ({ date }) => {
  const { graph } = useGraph(date)
  const hasData = graph && graph.length > 0 && date
  return (
    <Grid item lg={12} xs={12}>
      <Card className={styles.container}>
        {!hasData && (
          <p data-testid="noData">
            Please select a weather card to display graph data.
          </p>
        )}
        {hasData && (
          <div data-testid="graph" className={styles.graphContainer}>
            <ResponsiveContainer className={styles.graph}>
              <BarChart data={graph}>
                <Bar dataKey="value" fill={COLORS.primary} />
                {graph && (
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: COLORS.white
                    }}
                    className={styles.xAxis}
                    tickMargin={10}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </Grid>
  )
}

export default Graph
