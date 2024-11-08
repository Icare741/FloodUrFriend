const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Rend le dossier uploads accessible

// Endpoint pour l'upload de fichiers
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier uploadé' });
  }
  
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Un utilisateur connecté');

  socket.on('share-media', (data) => {
    socket.broadcast.emit('new-media', data);
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});