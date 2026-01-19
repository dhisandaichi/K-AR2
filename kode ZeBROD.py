import torch
import cv2
import numpy as np
from PIL import Image
import timm
from ultralytics import YOLO
from sklearn.metrics.pairwise import cosine_similarity
import torchvision.transforms as transforms

class ZeBRODSystem:
    def __init__(self):
        # 1. Load Model Detektor (YOLO)
        # Gunakan 'yolo11n.pt' atau 'yolov8n.pt' tergantung ketersediaan
        print("Memuat Model YOLO untuk Lokalisasi...")
        self.detector = YOLO('yolo11n.pt') 

        # 2. Load Model Pengenalan Fitur (DeIT)
        print("Memuat Model DeIT untuk Ekstraksi Fitur...")
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        # Menggunakan model DeIT base distiled patch16
        self.recognizer = timm.create_model('deit_base_distilled_patch16_224', pretrained=True)
        self.recognizer.eval() # Mode evaluasi (bukan training)
        self.recognizer.to(self.device)

        # 3. Database Galeri (Tempat simpan "Ingatan" produk)
        # Struktur: {'nama_produk': [vektor_1, vektor_2, ...]}
        self.gallery_vectors = {}
        self.gallery_labels = []
        self.gallery_features = [] # List flat untuk pencarian cepat

        # Transformasi gambar standar untuk DeIT
        self.preprocess = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

    def get_embedding(self, cv2_image):
        """Mengubah gambar (crop) menjadi vektor angka"""
        # Konversi BGR (OpenCV) ke RGB (PIL)
        img_rgb = cv2.cvtColor(cv2_image, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(img_rgb)
        
        # Preprocess dan masukkan ke GPU
        input_tensor = self.preprocess(pil_img).unsqueeze(0).to(self.device)
        
        # Ekstrak fitur tanpa menghitung gradien (hemat memori)
        with torch.no_grad():
            features = self.recognizer(input_tensor)
        
        # Kembalikan sebagai numpy array
        return features.cpu().numpy().flatten()

    def register_product(self, image_path, label_name):
        """
        Mendaftarkan produk baru ke database.
        Lakukan ini untuk setiap angle foto (1-3 foto per produk).
        """
        img = cv2.imread(image_path)
        if img is None:
            print(f"Error: Gambar {image_path} tidak ditemukan.")
            return

        # Deteksi objek dulu untuk memastikan kita hanya mengambil bendanya, bukan background
        results = self.detector(img, verbose=False)
        
        # Ambil deteksi dengan confidence tertinggi
        best_box = None
        max_conf = 0

        for r in results:
            for box in r.boxes:
                if box.conf > max_conf:
                    max_conf = box.conf
                    best_box = box.xyxy[0].cpu().numpy().astype(int)

        if best_box is not None:
            x1, y1, x2, y2 = best_box
            # Crop gambar sesuai kotak deteksi
            crop_img = img[y1:y2, x1:x2]
            
            # Dapatkan vektor fitur
            embedding = self.get_embedding(crop_img)
            
            # Simpan ke memori (Database)
            self.gallery_features.append(embedding)
            self.gallery_labels.append(label_name)
            print(f"✅ Berhasil mendaftarkan: {label_name} (dari file {image_path})")
        else:
            print(f"❌ Gagal: Tidak ada objek terdeteksi di {image_path}. Pastikan objek terlihat jelas.")

    def detect_and_recognize(self, target_image_path, threshold=0.6):
        """
        Fungsi utama: Deteksi lokasi -> Crop -> Bandingkan dengan Database
        """
        img = cv2.imread(target_image_path)
        results = self.detector(img)
        
        # Jika database kosong
        if len(self.gallery_features) == 0:
            print("Database kosong! Daftarkan produk dulu.")
            return img

        gallery_matrix = np.array(self.gallery_features)

        for result in results:
            for box in result.boxes:
                # 1. Ambil Koordinat
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy().astype(int)
                
                # 2. Crop Objek
                crop_img = img[y1:y2, x1:x2]
                if crop_img.size == 0: continue

                # 3. Ekstrak Fitur Objek yang dilihat
                query_vector = self.get_embedding(crop_img).reshape(1, -1)
                
                # 4. Hitung Kemiripan (Cosine Similarity) dengan SEMUA database
                similarities = cosine_similarity(query_vector, gallery_matrix)[0]
                
                # 5. Cari yang paling mirip (Nearest Neighbor)
                best_idx = np.argmax(similarities)
                best_score = similarities[best_idx]
                predicted_label = self.gallery_labels[best_idx]

                # 6. Tentukan Label Akhir
                if best_score > threshold:
                    text = f"{predicted_label} ({best_score:.2f})"
                    color = (0, 255, 0) # Hijau jika dikenali
                else:
                    text = f"Unknown ({best_score:.2f})"
                    color = (0, 0, 255) # Merah jika tidak dikenal

                # Gambar kotak dan teks
                cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
                cv2.putText(img, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        return img

# --- CONTOH PENGGUNAAN ---
if __name__ == "__main__":
    # Inisialisasi Sistem
    zebrod = ZeBRODSystem()

    print("\n--- TAHAP 1: PENDAFTARAN (Zero Retraining) ---")
    # Anggap Anda punya 3 foto Kopi, dan 2 foto Susu dengan angle beda
    # Anda cukup panggil fungsi ini berulang kali.
    
    # Contoh path (Ganti dengan path file asli Anda)
    # zebrod.register_product("foto_kopi_depan.jpg", "Kopi Robusta")
    # zebrod.register_product("foto_kopi_samping.jpg", "Kopi Robusta")
    # zebrod.register_product("foto_kopi_atas.jpg", "Kopi Robusta")
    
    # zebrod.register_product("foto_susu_depan.jpg", "Susu UHT")
    # zebrod.register_product("foto_susu_miring.jpg", "Susu UHT")

    # (Untuk demo ini berjalan, pastikan Anda punya file gambar, atau kode di atas akan skip)

    print("\n--- TAHAP 2: PENGUJIAN ---")
    # result_img = zebrod.detect_and_recognize("foto_rak_toko.jpg")
    
    # Tampilkan hasil
    # cv2.imshow("Hasil ZeBROD", result_img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    
    print("Sistem siap. Silakan uncomment bagian contoh penggunaan dan masukkan path gambar Anda.")