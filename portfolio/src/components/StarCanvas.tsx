import { useEffect, useRef } from "react";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1

    
    const stars = Array.from({ length: 150 }, () => ({
      xFrac: Math.random(),
      yFrac: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.001 + 0.0005,
    }))

    // smoothed mouse position, -1..1 relative to viewport center
    let mouseX = 0
    let mouseY = 0
    let smoothMouseX = 0
    let smoothMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    let t = 0;
    let raf: number

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx!.clearRect(0, 0, w, h)
      t += 0.01

      // ease the smoothed mouse position toward the raw target each frame,
      // giving the parallax a soft trailing feel instead of snapping
      smoothMouseX += (mouseX - smoothMouseX) * 0.08
      smoothMouseY += (mouseY - smoothMouseY) * 0.08

      stars.forEach(star => {
        // bigger stars = "closer" = shift more, giving a real sense of depth
        const depthFactor = star.r * 45
        const parallaxX = smoothMouseX * depthFactor
        const parallaxY = smoothMouseY * depthFactor

        const x = star.xFrac * w + parallaxX
        const y = star.yFrac * h + parallaxY
        const twinkle = star.alpha * (0.7 + 0.3 * Math.sin(t * star.speed * 1000 * (star.xFrac * w)))
        ctx!.beginPath()
        ctx!.arc(x, y, star.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${twinkle})`
        ctx!.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      resize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full" />
  )
}

export default Canvas;