import { useState, useEffect, useRef } from 'react'

interface WatermarkImageProps {
  src: string
  alt: string
  logoUrl?: string | null
  className?: string
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

export default function WatermarkImage({ 
  src, 
  alt, 
  logoUrl, 
  className = '',
  onError 
}: WatermarkImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [watermarkedSrc, setWatermarkedSrc] = useState<string>('')
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (!src || !logoUrl) {
      setWatermarkedSrc(src)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mainImage = new Image()
    mainImage.crossOrigin = 'anonymous'
    
    const logoImage = new Image()
    logoImage.crossOrigin = 'anonymous'

    mainImage.onload = () => {
      canvas.width = mainImage.naturalWidth
      canvas.height = mainImage.naturalHeight
      
      ctx.drawImage(mainImage, 0, 0)
      
      logoImage.onload = () => {
        const logoWidth = canvas.width * 0.3
        const logoHeight = (logoImage.naturalHeight / logoImage.naturalWidth) * logoWidth
        
        ctx.globalAlpha = 0.3
        
        const positions = [
          { x: canvas.width * 0.05, y: canvas.height * 0.05 },
          { x: canvas.width / 2 - logoWidth / 2, y: canvas.height / 2 - logoHeight / 2 },
          { x: canvas.width - logoWidth - canvas.width * 0.05, y: canvas.height - logoHeight - canvas.height * 0.05 }
        ]
        
        positions.forEach(pos => {
          ctx.drawImage(logoImage, pos.x, pos.y, logoWidth, logoHeight)
        })
        
        ctx.globalAlpha = 1.0
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
        setWatermarkedSrc(dataUrl)
        setImageLoaded(true)
      }
      
      logoImage.onerror = () => {
        setWatermarkedSrc(src)
        setImageLoaded(true)
      }
      
      logoImage.src = logoUrl
    }
    
    mainImage.onerror = () => {
      setImageLoaded(true)
      if (onError) {
        onError?.({ target: { src } } as any)
      }
    }
    
    mainImage.src = src
  }, [src, logoUrl, onError])

  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    return false
  }

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
    return false
  }

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <img
        src={watermarkedSrc || src}
        alt={alt}
        className={`${className} select-none pointer-events-auto`}
        style={{ 
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        onError={onError}
      />
    </>
  )
}
