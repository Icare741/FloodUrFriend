import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './Overlay.css'

const socket = io('http://localhost:3000')

function Overlay() {
  const [media, setMedia] = useState(null)

  useEffect(() => {
    socket.on('new-media', (data) => {
      setMedia(data)
      window.electron.send('show-overlay')
    })

    return () => socket.off('new-media')
  }, [])

  if (!media) return null

  return (
    <div className="overlay">
      {media.type === 'image' ? (
        <img src={media.content} alt={media.name} />
      ) : (
        <video 
          src={media.content} 
          autoPlay 
          loop 
          controls={false}
        />
      )}
    </div>
  )
}

export default Overlay 