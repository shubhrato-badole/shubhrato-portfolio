import {useEffect, useRef} from "react";


function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
           const canvas = canvasRef.current
    if (!canvas) return

        const ctx = canvas.getContext('2d')
        if(!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = Array.from({length:150}, () =>({
         
        x:Math.random()* canvas.width,
        y:Math.random()* canvas.height,
        r:Math.random()*1.5 + 0.3,
        alpha:Math.random()*0.6 + 0.2,
         speed: Math.random() * 0.001 + 0.0005,
        }))

        let t = 0;
        let raf :  number

        function draw(){
          ctx!.clearRect(0,0, canvas!.width, canvas!.height)
          t+= 0.01

          stars.forEach(star =>{
           const twinkle = star.alpha * (0.7+ 0.3 *Math.sin(t* star.speed * 1000 * star.x))
         ctx!.beginPath()
         ctx!.arc(star.x, star.y, star.r , 0 , Math.PI*2)
         ctx!.fillStyle = `rgba(255,255,255,${twinkle})`
         ctx!.fill()
          })

       raf = requestAnimationFrame(draw)
        }

        draw()

        const handleResize = () =>{
            canvas!.width= window.innerWidth;
            canvas.height = window.innerHeight;
        }
      window.addEventListener('resize', handleResize)
  
     
        return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
     
        
    },[])

return (
    <canvas ref={canvasRef} 
    className="absolute inset-0 w-full h-full" />
)

}

export default Canvas;