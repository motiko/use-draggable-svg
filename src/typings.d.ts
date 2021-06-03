
interface Coords {
  x: number
  y: number
}

interface Props {
  containerRef: RefObject<SVGGraphicsElement>
  onDragEnd: ({ from, to }: { from: Coords; to: Coords }) => void
}

