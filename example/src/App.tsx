import React, { useRef } from 'react'

import useDraggable from 'use-draggable-svg'

const App = () => {
  const containerRef = useRef<any>()
  const { startDrag } = useDraggable({
    containerRef,
    onDragEnd: ({ from, to }) => console.log(from, to)
  })

  return (
    <svg viewBox='0 0 30 20' ref={containerRef} fill="lightgray">
      <svg
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        viewBox='0 0 300 200'
        x='10'
        y='3'
      >
        <rect width='20' height='30' fill='lightgreen' />
      </svg>
      <svg
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        viewBox='0 0 300 200'
        x='4'
        y='5'
      >
        <rect width='50' height='50' fill='skyblue' />
      </svg>
      <svg
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        viewBox='0 0 300 200'
        x='18'
        y='5'
      >
        <rect width='30' height='20' fill='gray' />
      </svg>
    </svg>
  )
}

export default App
