# 📦 Panduan Deployment ke GitHub Pages

## ✅ Checklist Sebelum Deploy

### 1. **Install Dependencies**
Jalankan di terminal:
```bash
npm install
```

Package yang akan diinstall:
- `react`, `react-dom`, `react-router-dom` - Framework React
- `react-scripts` - Build tools
- `express`, `cors` - Backend server
- `mind-ar` - AR library
- `concurrently` - Menjalankan multiple commands
- `gh-pages` - Deploy ke GitHub Pages

### 2. **Verifikasi File-file Penting**

Pastikan semua file berikut sudah ada:

**Frontend:**
- ✅ `package.json` - Dependencies dan scripts
- ✅ `public/index.html` - HTML template dengan MindAR & A-Frame
- ✅ `src/index.js` - Entry point React
- ✅ `src/index.css` - Global styling
- ✅ `src/App.js` - Main component dengan navigasi
- ✅ `src/config.js` - Konfigurasi API URL
- ✅ `src/components/ImageSlider.js` - Image Slider AR component
- ✅ `src/components/ThreeDViewer.js` - 3D Model AR component
- ✅ `src/components/VideoAR.js` - Video AR component

**Backend:**
- ✅ `server.js` - Express backend server

**Assets:**
- ✅ `targets.mind` - AR marker target
- ✅ `New Project(7)(1-10).jpg` - Gambar untuk slider
- ✅ `plusgroup*.glb` - Model 3D
- ✅ `video.mp4` - Video file

**Configuration:**
- ✅ `.gitignore` - Exclude node_modules, build
- ✅ `README.md` - Dokumentasi utama
- ✅ `DEPLOYMENT.md` - Panduan deployment ini

---

## 🚀 Deployment Steps

### **Langkah 1: Build Project**

Test build terlebih dahulu:
```bash
npm run build
```

Ini akan membuat folder `build/` yang berisi static files untuk production.

### **Langkah 2: Deploy ke GitHub Pages**

Pastikan repository sudah di-push ke GitHub, lalu:

```bash
npm run deploy
```

Script ini akan:
1. Menjalankan `npm run build` otomatis (predeploy)
2. Deploy folder `build/` ke branch `gh-pages`
3. GitHub Pages akan otomatis host branch tersebut

### **Langkah 3: Aktifkan GitHub Pages**

1. Buka repository di GitHub: `https://github.com/dhisandaichi-cpu/testAR`
2. Klik **Settings** → **Pages**
3. Pada **Source**, pilih branch **gh-pages** dan folder **/ (root)**
4. Klik **Save**
5. Tunggu beberapa menit, site akan tersedia di:
   ```
   https://dhisandaichi-cpu.github.io/testAR
   ```

---

## ⚠️ PENTING: Backend Deployment

**GitHub Pages hanya host static files (frontend)**. Backend Express (`server.js`) **TIDAK BISA** di-host di GitHub Pages.

### **Opsi untuk Host Backend:**

#### **Opsi 1: Vercel (Recommended)** ⭐
1. Buat file `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Deploy:
```bash
vercel
```

4. Copy URL yang diberikan (misal: `https://testar-xxx.vercel.app`)

5. Update `src/config.js`:
```javascript
production: {
  baseURL: 'https://testar-xxx.vercel.app',
}
```

#### **Opsi 2: Railway**
1. Buat akun di [railway.app](https://railway.app)
2. Buat new project → Deploy from GitHub
3. Pilih repository `testAR`
4. Railway akan auto-detect Express app
5. Copy domain yang diberikan
6. Update `src/config.js` dengan URL tersebut

#### **Opsi 3: Render**
1. Buat akun di [render.com](https://render.com)
2. New → Web Service
3. Connect repository
4. Build command: `npm install`
5. Start command: `node server.js`
6. Copy URL yang diberikan
7. Update `src/config.js`

#### **Opsi 4: Heroku**
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create testar-backend`
4. Add Procfile:
```
web: node server.js
```
5. Deploy:
```bash
git push heroku main
```
6. Copy URL dan update `src/config.js`

---

## 🔧 Setelah Deploy Backend

1. Update `src/config.js`:
```javascript
production: {
  baseURL: 'https://your-backend-url.com', // Ganti dengan URL backend Anda
}
```

2. Re-build dan re-deploy frontend:
```bash
npm run deploy
```

---

## 🧪 Testing Deployment

### **Test Lokal (Development):**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm start
```

Browser akan buka di `http://localhost:3000`

### **Test Production Build Lokal:**
```bash
npm run build
npx serve -s build
```

Browser akan buka di `http://localhost:3000` (atau port lain yang ditampilkan)

### **Test GitHub Pages:**
Buka: `https://dhisandaichi-cpu.github.io/testAR`

---

## 📝 Update Deployment

Setiap kali ada perubahan:

1. Commit changes:
```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

2. Re-deploy:
```bash
npm run deploy
```

---

## 🐛 Troubleshooting

### **404 Error di GitHub Pages**
- Pastikan `homepage` di `package.json` benar
- Cek apakah branch `gh-pages` ada
- Tunggu 5-10 menit setelah deploy pertama

### **Blank Page**
- Buka DevTools Console untuk lihat error
- Pastikan path benar (karena deployed di subfolder `/testAR`)
- Verify `homepage` in `package.json`

### **CORS Error saat Fetch API**
- Backend harus enable CORS (sudah ada di `server.js`)
- Backend URL di `config.js` harus correct
- Pastikan backend server running

### **AR Tidak Work**
- HTTPS required untuk camera access (GitHub Pages auto-HTTPS ✅)
- Allow camera permission di browser
- Pastikan `targets.mind` accessible dari backend

### **Assets Tidak Load**
- Pastikan backend URL correct di `config.js`
- Cek backend server running dan accessible
- Cek CORS headers di backend

---

## 📊 Build Information

Setelah `npm run build`, akan ada folder `build/` dengan:
- `index.html` - Main HTML
- `static/js/` - Bundled JavaScript (React app)
- `static/css/` - Compiled CSS
- Asset references akan di-hash untuk caching

File size estimate:
- HTML: ~2KB
- JS bundle: ~500KB (includes React + MindAR)
- CSS: ~10KB

---

## 🔐 Environment Variables (Optional)

Jika butuh environment variables untuk production:

1. Buat file `.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.com
```

2. Update `config.js`:
```javascript
production: {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
}
```

**Note:** GitHub Pages tidak support server-side env vars. Nilai akan di-baked saat build.

---

## ✅ Checklist Final

Sebelum deploy production:

- [ ] `npm install` sukses
- [ ] `npm run build` sukses tanpa error
- [ ] Backend deployed dan accessible
- [ ] `src/config.js` updated dengan backend URL production
- [ ] Test lokal: frontend + backend berfungsi
- [ ] Commit semua changes
- [ ] `npm run deploy` sukses
- [ ] GitHub Pages settings configured
- [ ] Test live URL: `https://dhisandaichi-cpu.github.io/testAR`
- [ ] Test semua 3 fitur AR (Image, 3D, Video)
- [ ] Camera permission work
- [ ] AR tracking work dengan targets.mind

---

## 📚 Resources

- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Mobile Responsive Features](./MOBILE_RESPONSIVE.md) - Full responsive design guide

---

**Happy Deploying! 🎉**
