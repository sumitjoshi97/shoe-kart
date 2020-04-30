import React, { useState, useRef, useEffect } from 'react'

const useResize = (ref: React.RefObject<HTMLDivElement>) => {
  const [length, setLength] = useState<number>(0)

  const observer = useRef(
    new ResizeObserver(entries => {
      const { width } = entries[0].contentRect
      setLength(Math.floor(width / 3))
    }),
  )

  useEffect(() => {
    if (
      typeof ref !== 'object' ||
      ref === null ||
      !(ref.current instanceof Element)
    )
      return

    const element = ref.current
    observer.current.observe(element)
    return () => {
      observer.current.unobserve(element)
    }
  }, [ref, observer])

  return { length }
}

export default useResize
