import React, { FC, SVGProps, useState } from 'react'
import styles from './style.module.scss'
import cx from 'classnames/bind'
import Btn from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { v4 as uuid } from 'uuid'
import { useDispatch } from '../../redux/store'
import { tempActions } from '../../redux/slices/temperatureSlice'
import { TempMeasure } from '../../types'

const cn = cx.bind(styles)

interface RadioGroupProps {
  options: {
    [key: string]: FC<SVGProps<SVGSVGElement>>;
  };
  active?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  active
}) => {
  const dispatch = useDispatch()
  const [activeBtn, setActiveBtn] = useState<string>(active || Object.keys(options)[0])
  const onClick = (value: string) => {
    setActiveBtn(value)
    dispatch(tempActions.setMeasure(value.toLowerCase() as TempMeasure))
  }
  return (
    <ButtonGroup data-testid='radioGroup' className={styles.container}>
      {Object.keys(options).map(k => {
        const isActive = activeBtn === k
        const Icon: FC<React.SVGProps<SVGSVGElement>> = options[k]
        return <Btn
          data-testid={k}
          key={uuid()}
          startIcon={<Icon className={styles.icon} />}
          onClick={() => onClick(k)}
          className={cn({ active: isActive }, 'btn')}
        >
          {k}
        </Btn>
      })}
    </ButtonGroup>
  )
}

export default RadioGroup
