
function easeInOutCubic(t:any) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }
   
  export function smoothScrollTo(target:any, duration = 900, offset = 0) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
   
    const startY = window.scrollY
    const targetY = target.getBoundingClientRect().top + startY - offset
   
    if (prefersReducedMotion) {
      window.scrollTo(0, targetY)
      return
    }
   
    const diff = targetY - startY
    let startTime:any = null
   
    function step(timestamp:any) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutCubic(progress)
      window.scrollTo(0, startY + diff * eased)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
   
    requestAnimationFrame(step)
  }