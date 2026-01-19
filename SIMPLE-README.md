# 🚀 AR Prototype - Simple Version

## ✅ Versi Sederhana dengan HTML/CSS/JS

**Tidak perlu:**
- ❌ npm install
- ❌ Backend server
- ❌ Build process
- ❌ React atau framework lain

**Cukup:**
- ✅ Buka file HTML langsung di browser
- ✅ Atau deploy ke GitHub Pages langsung

---

## 📁 File yang Dibuat

```
testAR/
├── simple-index.html      # Halaman utama
├── simple-style.css       # Stylesheet untuk semua halaman
├── image-slider.html      # Image Slider AR
├── 3d-viewer.html         # 3D Model AR
├── video-ar.html          # Video AR
│
└── Assets (yang sudah ada):
    ├── New Project(7)(1-10).jpg
    ├── plusgroupnew.glb
    ├── video.mp4
    └── targets.mind
```

---

## 🎯 Cara Menggunakan (Lokal)

### **Opsi 1: Buka Langsung di Browser**

1. **Buka file** `simple-index.html` dengan browser
2. **Pilih salah satu menu** AR
3. **Klik** "Start AR Mode"
4. **Izinkan** akses kamera
5. **Arahkan** kamera ke marker targets.mind

⚠️ **Catatan:** Untuk akses kamera, mungkin perlu HTTPS. Gunakan local server atau deploy online.

### **Opsi 2: Gunakan Local Server (Recommended)**

Jika browser meminta HTTPS untuk camera access:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (jika ada):**
```bash
npx serve
```

**PHP:**
```bash
php -S localhost:8000
```

Lalu buka: `http://localhost:8000/simple-index.html`

---

## 🌐 Deploy ke GitHub Pages

### **Sangat Mudah!**

1. **Push semua files ke GitHub:**
```bash
git add .
git commit -m "Add simple AR prototype"
git push origin main
```

2. **Aktifkan GitHub Pages:**
   - Buka repo di GitHub
   - Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

3. **Akses aplikasi:**
   ```
   https://dhisandaichi-cpu.github.io/testAR/simple-index.html
   ```

4. **Done!** ✨ Langsung jalan dengan HTTPS

---

## 🎨 Fitur

### **1. Image Slider AR** 📸
- Preview 9 gambar dengan slider
- Tombol Previous/Next
- Keyboard navigation (← →)
- Ganti gambar dalam AR mode
- File: `image-slider.html`

### **2. 3D Model AR** 🎨
- Tampilkan model GLB
- Rotasi otomatis (360° / 10 detik)
- Model: `plusgroupnew.glb`
- File: `3d-viewer.html`

### **3. Video AR** 🎬
- Preview video dengan controls
- Auto-play dalam AR
- Video loop otomatis
- File: `video-ar.html`

### **4. Responsive Design** 📱
- Desktop, Tablet, Mobile
- Touch-friendly buttons
- Portrait & Landscape support
- Modern glassmorphism UI

---

## 🔧 Teknologi

- **HTML5** - Structure
- **CSS3** - Styling (Glassmorphism, Gradients)
- **Vanilla JavaScript** - Logic & Interactivity
- **A-Frame 1.4.2** - WebXR Framework (via CDN)
- **MindAR 1.2.2** - AR Image Tracking (via CDN)

**Total Dependencies:** 0 (semua via CDN)

---

## 💡 Keuntungan Versi Simple

✅ **No Build Process** - Langsung edit dan refresh  
✅ **No npm install** - Tidak perlu Node.js  
✅ **No Backend** - Full static files  
✅ **Fast Deploy** - Push ke GitHub Pages langsung jalan  
✅ **Easy Debug** - Buka DevTools, langsung lihat code  
✅ **Lightweight** - File kecil, load cepat  
✅ **Portable** - Copy folder, langsung jalan  

---

## 📱 Testing

### **Desktop:**
1. Buka `simple-index.html`
2. Pilih menu
3. Start AR Mode
4. Gunakan webcam

### **Mobile:**
1. Deploy ke GitHub Pages (HTTPS diperlukan)
2. Atau gunakan local server dengan Ngrok/tunneling
3. Buka di browser mobile
4. Izinkan camera access
5. Arahkan ke marker

---

## 🎯 Targets.mind

Semua 3 fitur menggunakan file **targets.mind** yang sama untuk AR tracking.

**Print marker** atau **tampilkan di layar lain** untuk testing.

---

## 🔧 Customization

### **Ganti Gambar:**
Edit di `image-slider.html`:
```javascript
const images = [
    { file: 'New Project(7)(1).jpg', id: 'img1' },
    // Tambah atau ubah di sini
];
```

### **Ganti Model 3D:**
Edit di `3d-viewer.html`:
```html
<a-asset-item id="model3d" src="namafile.glb"></a-asset-item>
```

### **Ganti Video:**
Edit di `video-ar.html`:
```html
<video id="arvideo" src="video.mp4" ...></video>
```

### **Ubah Style:**
Edit `simple-style.css` - semua styling terpusat di sini.

---

## 🐛 Troubleshooting

### **Camera tidak bisa akses:**
- ✅ Gunakan HTTPS (GitHub Pages auto-HTTPS)
- ✅ Atau gunakan `localhost` dengan local server
- ✅ Pastikan izin camera allowed di browser

### **AR tidak track:**
- ✅ Cek file `targets.mind` ada di folder yang sama
- ✅ Pastikan pencahayaan cukup
- ✅ Marker harus jelas terlihat
- ✅ Jaga jarak 30-50cm

### **File tidak load:**
- ✅ Cek path file benar (case-sensitive)
- ✅ Semua file dalam 1 folder yang sama
- ✅ Cek browser console untuk error

### **Model 3D tidak muncul:**
- ✅ File GLB harus valid
- ✅ Cek path file benar
- ✅ Tunggu loading (file GLB bisa besar)

---

## 📊 File Size

| File | Size |
|------|------|
| simple-index.html | ~4 KB |
| image-slider.html | ~7 KB |
| 3d-viewer.html | ~5 KB |
| video-ar.html | ~5 KB |
| simple-style.css | ~10 KB |
| **Total Code** | **~31 KB** |
| | |
| A-Frame (CDN) | ~800 KB |
| MindAR (CDN) | ~2 MB |

**Total Download (First Load):** ~3 MB (mostly CDN libraries)

---

## 🎉 Quick Start Summary

```bash
# 1. Clone atau download repo
git clone https://github.com/dhisandaichi-cpu/testAR.git
cd testAR

# 2. Buka dengan local server
python -m http.server 8000

# 3. Buka browser
# http://localhost:8000/simple-index.html

# 4. Atau deploy ke GitHub Pages
git push origin main
# Aktifkan di Settings → Pages
# Akses: https://dhisandaichi-cpu.github.io/testAR/simple-index.html
```

---

## ✅ Comparison: Simple vs React Version

| Feature | Simple Version | React Version |
|---------|----------------|---------------|
| **Setup** | None | npm install |
| **Server** | Optional | Backend + Frontend |
| **Build** | No | Yes (npm run build) |
| **Deploy** | Direct push | Build → Deploy |
| **Dependencies** | 0 | ~1000+ packages |
| **File Size** | ~31 KB | ~500 KB+ |
| **Learning Curve** | Easy | Medium |
| **Best For** | Prototype, Demo | Production, Scale |

---

## 🚀 Next Steps

1. **Test lokal** dengan local server
2. **Deploy** ke GitHub Pages
3. **Test mobile** dengan real device
4. **Print marker** untuk AR testing
5. **Customize** sesuai kebutuhan

---

**Status:** ✅ **READY TO USE!**  
**Dibuat:** 19 Januari 2026  
**Versi:** Simple HTML/CSS/JS (No Build)

Simple is Better! 🎯
