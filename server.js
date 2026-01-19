const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// API untuk mendapatkan daftar gambar
app.get('/api/images', (req, res) => {
  const imageFiles = fs.readdirSync(__dirname)
    .filter(file => file.startsWith('New Project') && file.endsWith('.jpg'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\((\d+)\)/g)?.[1]?.replace(/[()]/g, '') || 0);
      const numB = parseInt(b.match(/\((\d+)\)/g)?.[1]?.replace(/[()]/g, '') || 0);
      return numA - numB;
    });
  
  res.json({
    images: imageFiles.map(file => ({
      name: file,
      url: `http://localhost:${PORT}/${file}`
    }))
  });
});

// API untuk mendapatkan file GLB terbaru
app.get('/api/glb-latest', (req, res) => {
  const glbFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.glb'))
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(__dirname, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);
  
  if (glbFiles.length > 0) {
    res.json({
      name: glbFiles[0].name,
      url: `http://localhost:${PORT}/${glbFiles[0].name}`
    });
  } else {
    res.status(404).json({ error: 'No GLB file found' });
  }
});

// API untuk mendapatkan file video
app.get('/api/video', (req, res) => {
  const videoFile = 'video.mp4';
  if (fs.existsSync(path.join(__dirname, videoFile))) {
    res.json({
      name: videoFile,
      url: `http://localhost:${PORT}/${videoFile}`
    });
  } else {
    res.status(404).json({ error: 'Video file not found' });
  }
});

// API untuk targets.mind
app.get('/api/targets', (req, res) => {
  const targetsFile = 'targets.mind';
  if (fs.existsSync(path.join(__dirname, targetsFile))) {
    res.sendFile(path.join(__dirname, targetsFile));
  } else {
    res.status(404).json({ error: 'Targets file not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
