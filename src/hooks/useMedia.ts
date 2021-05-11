import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const useMedia = () => {
  const isSmall = useMediaQuery({ query: '(max-width: 600px)' })
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(isSmall)
    console.log('IsMobile?', isSmall)
  }, [isSmall])

  return {
    isMobile
  }
}
