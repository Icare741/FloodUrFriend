import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './MediaOverlay.css'

const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
})

function MediaOverlay() {
  const [sharedMedia, setSharedMedia] = useState(null)

  useEffect(() => {
    socket.on('new-media', (data) => {
      console.log('Nouveau média reçu:', data)
      setSharedMedia(data)
    })

    return () => {
      socket.off('new-media')
    }
  }, [])

  if (!sharedMedia) return null

  return (
    <div className="media-overlay">
      {sharedMedia.type === 'image' ? (
        <img src={sharedMedia.content} alt={sharedMedia.name} />
      ) : (
        <video 
          src={sharedMedia.content} 
          autoPlay 
          loop 
          controls={false}
        />
      )}
    </div>
  )
}

export default MediaOverlay 