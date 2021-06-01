import { useRef, useEffect } from 'react'
import type { RefObject } from 'react'

type NodeInHtml = Node & ParentNode

export interface Coords {
  x: number
  y: number
}

interface Props {
  containerRef: RefObject<SVGGraphicsElement>
  onDragEnd: ({ from, to }: { from: Coords; to: Coords }) => void
}

function findFirstSvgParent(node: NodeInHtml): any {
  if (node.nodeName === 'svg') return node
  if (node.parentNode === null) return null
  return findFirstSvgParent(node.parentNode)
}

export default function useDraggable({ containerRef, onDragEnd }: Props) {
  const draggedSvg = useRef<any>()
  const dragOffset = useRef<any>()
  const draggedFrom = useRef<any>()
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', drag)
      containerRef.current.addEventListener('touchmove', drag)
      containerRef.current.addEventListener('mouseup', endDrag)
      containerRef.current.addEventListener('touchend', endDrag)
    }
  })

  function startDrag(evt: MouseEvent & TouchEvent) {
    if (evt.target) {
      const { x, y } = getMousePosition(evt)
      draggedFrom.current = { x, y }
      dragOffset.current = { x, y }
      draggedSvg.current = findFirstSvgParent(evt.target as NodeInHtml)
      const svgNode: any = draggedSvg.current
      dragOffset.current.x -= parseFloat(svgNode.getAttributeNS(null, 'x'))
      dragOffset.current.y -= parseFloat(svgNode.getAttributeNS(null, 'y'))
    }
  }

  function endDrag(): void {
    const svgNode: any = draggedSvg.current
    if (svgNode) {
      const x = svgNode.getAttributeNS(null, 'x') || 0
      const y = svgNode.getAttributeNS(null, 'y') || 0
      svgNode.setAttributeNS(null, 'x', Math.round(x))
      svgNode.setAttributeNS(null, 'y', Math.round(y))
      onDragEnd({ to: { x, y }, from: draggedFrom.current })
    }
    draggedSvg.current = null
  }

  function drag(evt: MouseEvent & TouchEvent) {
    if (draggedSvg?.current) {
      const svgNode: any = draggedSvg.current
      if (svgNode) {
        evt.preventDefault()
        const { x, y } = getMousePosition(evt)
        svgNode.setAttributeNS(null, 'x', x - dragOffset.current.x)
        svgNode.setAttributeNS(null, 'y', y - dragOffset.current.y)
      }
    }
  }

  function getMousePosition(evt: MouseEvent & TouchEvent): Coords {
    if (containerRef.current) {
      const CTM = containerRef.current.getScreenCTM()
      let x = evt.clientX
      let y = evt.clientY
      if (evt.touches) {
        x = evt.touches[0].clientX
        y = evt.touches[0].clientY
      }
      if (CTM) {
        return {
          x: (x - CTM.e) / CTM.a,
          y: (y - CTM.f) / CTM.d
        }
      }
    }
    return { x: 0, y: 0 }
  }

  return { drag, startDrag, endDrag }
}
