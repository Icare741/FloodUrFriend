import { useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import './Control.css'

const socket = io('http://localhost:3000')
const UPLOAD_URL = 'http://localhost:3000/upload' // URL de notre endpoint d'upload

function Control() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleFileShare = async () => {
    if (!selectedFile) return
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const data = {
        type: selectedFile.type.includes('image') ? 'image' : 'video',
        name: selectedFile.name,
        content: response.data.url // URL du fichier uploadé
      }

      socket.emit('share-media', data)
      window.electron.send('show-overlay')
    } catch (error) {
      console.error("Erreur lors de l'upload:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="control-panel">
      <input 
        type="file" 
        accept="image/*,video/*" 
        onChange={handleFileSelect}
        disabled={isUploading}
      />
      <button 
        onClick={handleFileShare} 
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? 'Envoi en cours...' : 'Partager'}
      </button>
    </div>
  )
}

export default Control 