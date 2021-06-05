# use-draggable-svg

Right now supports only svg in svg. Support for draggable groups is comming.
Open to PR's and suggestions.

> React hook to drag SVG objects

[![NPM](https://img.shields.io/npm/v/use-draggable-svg.svg)](https://www.npmjs.com/package/use-draggable-svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

[Demo](https://motiko.github.io/use-draggable-svg/)
## Install

```bash
npm install --save use-draggable-svg
```

## Usage

```tsx
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
        x='18'
        y='5'
      >
        <rect width='30' height='20' fill='gray' />
      </svg>
    </svg>
  )
}

export default App
```

## License

MIT © [motiko](https://github.com/motiko)
