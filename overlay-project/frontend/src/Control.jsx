import { useState } from 'react'
import io from 'socket.io-client'
import './Control.css'

const socket = io('http://localhost:3000')

function Control() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleFileShare = () => {
    if (!selectedFile) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = {
        type: selectedFile.type.includes('image') ? 'image' : 'video',
        name: selectedFile.name,
        content: e.target.result
      }
      socket.emit('share-media', data)
      window.electron.send('show-overlay')
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <div className="control-panel">
      <input 
        type="file" 
        accept="image/*,video/*" 
        onChange={handleFileSelect}
      />
      <button onClick={handleFileShare}>Partager</button>
    </div>
  )
}

export default Control 