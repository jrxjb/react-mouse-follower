import { useCallback, useEffect, useRef } from 'react'

const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches
const MIN_DISTANCE = 250       // px totales arrastrados (antes 150)
const MAX_IDLE_MS = 800     // ms para tocar la poción después de soltar
const MIN_GESTURE = 25         // px para considerar un gesto "arrastre" y no un tap

export function useTouchDrag(isPlaying, maxIdleMs = MAX_IDLE_MS) {  
  const distance = useRef(0)
  const gestureDistance = useRef(0)
  const lastPoint = useRef(null)
  const releasedAt = useRef(0)
  const lastMoveAt = useRef(0)

  const track = useCallback((x, y) => {
    const previous = lastPoint.current
    lastPoint.current = { x, y }
    if (!previous) return          // primer evento del gesto: descartado
    const d = Math.hypot(x - previous.x, y - previous.y)
    if (d > 2) {
      distance.current += d
      gestureDistance.current += d
      lastMoveAt.current = performance.now()
    }
  }, [])

  const reset = useCallback(() => {
    distance.current = 0
    gestureDistance.current = 0
    lastPoint.current = null
    releasedAt.current = 0
    lastMoveAt.current = 0
  }, [])

  const check = useCallback(() => {
    if (!IS_TOUCH) return null
    if (distance.current < MIN_DISTANCE) return 'Gotcha! Move first'
    const since = releasedAt.current || lastMoveAt.current
    if (performance.now() - since > maxIdleMs) return 'Too slow! Drag again' 
    return null
 }, [maxIdleMs])  

  useEffect(() => {
    if (!IS_TOUCH || !isPlaying) return

    const onMove = (event) => track(event.clientX, event.clientY)
    const onDown = () => { gestureDistance.current = 0 }

    const onUp = () => {
      if (gestureDistance.current > MIN_GESTURE) releasedAt.current = performance.now()
      gestureDistance.current = 0
      lastPoint.current = null     // acá se corta el salto entre gestos
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [isPlaying, track])

  return { reset, check }
}