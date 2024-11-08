import { useState } from 'react'
import io from 'socket.io-client'
import './App.css'

const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
})

function App() {
  const handleFileShare = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = {
        type: file.type.includes('image') ? 'image' : 'video',
        name: file.name,
        content: e.target.result
      }
      socket.emit('share-media', data)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="controls">
      <input 
        type="file" 
        accept="image/*,video/*" 
        onChange={handleFileShare}
      />
      <button>Partager</button>
    </div>
  )
}

export default App