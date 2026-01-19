# AR Prototype Application

Aplikasi prototype AR menggunakan React.js dengan 3 fitur utama:
- **Image Slider AR** - Menampilkan gambar "New Project (N)" dalam AR
- **3D Model AR** - Menampilkan model GLB 3D terbaru
- **Video AR** - Menampilkan video dalam AR

Semua fitur menggunakan file `targets.mind` yang sama untuk AR tracking.

## 🚀 Instalasi

1. Install dependencies:
```bash
npm install
```

## 📱 Cara Menjalankan

### Menjalankan Backend Server (Port 5000):
```bash
npm run server
```

### Menjalankan Frontend React (Port 3000):
Di terminal terpisah, jalankan:
```bash
npm start
```

### Atau jalankan keduanya sekaligus:
```bash
npm run dev
```

## 🎯 Cara Menggunakan

1. Buka browser di `http://localhost:3000`
2. Pilih salah satu menu:
   - **Image Slider AR** - Browse dan tampilkan gambar dalam AR
   - **3D Model AR** - Tampilkan model 3D dengan rotasi otomatis
   - **Video AR** - Putar video dalam AR
3. Klik "Start AR Mode" pada submenu yang dipilih
4. Izinkan akses kamera
5. Arahkan kamera ke target marker (targets.mind)
6. Konten akan muncul di AR!

## 📁 Struktur File

```
testAR/
├── public/
│   └── index.html          # HTML template dengan MindAR & A-Frame
├── src/
│   ├── components/
│   │   ├── ImageSlider.js  # Komponen Image Slider AR
│   │   ├── ThreeDViewer.js # Komponen 3D Model AR
│   │   └── VideoAR.js      # Komponen Video AR
│   ├── App.js              # Komponen utama dengan navigasi
│   ├── index.js            # Entry point React
│   └── index.css           # Styling modern dengan glassmorphism
├── server.js               # Express backend server
├── package.json            # Dependencies
├── targets.mind            # AR marker target (digunakan semua fitur)
├── New Project(7)(1-10).jpg # Gambar untuk Image Slider
├── plusgroup*.glb          # Model 3D
└── video.mp4               # Video untuk Video AR
```

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React.js** - Framework UI
- **A-Frame** - Framework WebXR
- **MindAR** - Library AR image tracking
- **CSS3** - Styling dengan glassmorphism & gradients

### Backend
- **Express.js** - REST API server
- **CORS** - Cross-origin resource sharing

## 🎨 Fitur

### 1. Image Slider AR
- Menampilkan semua gambar "New Project (N)"
- Navigasi Previous/Next untuk mengganti gambar
- Preview mode dan AR mode
- Semua gambar dapat ditampilkan di AR secara bergantian

### 2. 3D Model AR
- Menampilkan file GLB terbaru
- Rotasi otomatis pada model 3D
- Scale dan posisi yang dapat disesuaikan

### 3. Video AR
- Memutar video dalam AR
- Auto-play dan loop
- Video dengan aspect ratio 16:9

### 4. 📱 Fully Responsive Design
- **Desktop, Tablet, Mobile** - Optimized untuk semua device sizes
- **Touch-friendly UI** - Button size min 44x44px untuk easy tapping
- **Orientation support** - Portrait dan Landscape mode
- **Mobile-optimized AR** - AR viewer yang adjust berdasarkan screen size
- **Responsive navigation** - Vertical stack pada mobile, horizontal pada desktop
- **Breakpoints:** 1024px, 768px, 640px, 480px, 375px
- Lihat detail lengkap di [`MOBILE_RESPONSIVE.md`](MOBILE_RESPONSIVE.md)

## 📋 API Endpoints

- `GET /api/images` - Mendapatkan daftar gambar
- `GET /api/glb-latest` - Mendapatkan file GLB terbaru
- `GET /api/video` - Mendapatkan file video
- `GET /api/targets` - Mendapatkan file targets.mind

## 🎯 Targets.mind

File `targets.mind` adalah file marker AR yang digunakan oleh semua 3 submenu. File ini berisi:
- Image target untuk tracking
- Kompilasi dari marker yang akan dikenali kamera

## 💡 Tips

1. **Pencahayaan**: Pastikan ruangan memiliki pencahayaan yang cukup
2. **Target Marker**: Print atau tampilkan target marker di layar lain
3. **Jarak Kamera**: Jaga jarak optimal antara kamera dan marker (30-50cm)
4. **Browser**: Gunakan browser modern (Chrome/Edge recommended)
5. **HTTPS**: Untuk production, gunakan HTTPS untuk akses kamera

## 🔧 Troubleshooting

### Error "Gagal memuat gambar/video/3D"
- Pastikan server backend berjalan di port 5000
- Cek apakah file tersedia di direktori root

### Kamera tidak muncul
- Izinkan akses kamera di browser
- Pastikan tidak ada aplikasi lain yang menggunakan kamera

### AR tidak track
- Pastikan file targets.mind tersedia
- Cek pencahayaan dan jarak kamera ke marker
- Pastikan marker terlihat jelas oleh kamera

## 📄 License

Prototype untuk keperluan testing dan development.
