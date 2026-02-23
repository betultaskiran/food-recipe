# Food Recipe App 

Bu proje, kullanıcıların yemek tarifleri paylaşabileceği, favorilerine ekleyebileceği ve yorum yapabileceği tam kapsamlı bir **Full-Stack Yemek Tarifi** uygulamasıdır. Kullanıcı dostu arayüzü ve güçlü backend yapısı ile modern bir web deneyimi sunar.

##  Özellikler

- **Kullanıcı Yetkilendirme:** Kayıt olma, giriş yapma ve JWT tabanlı güvenli oturum yönetimi.
- **Yemek Tarifi Yönetimi:** Tarif ekleme, düzenleme, silme ve görüntüleme.
- **Resim Yükleme:** Tarifler için görsel desteği (Multer ile).
- **Yorum ve Değerlendirme:** Tariflere yorum yapabilme özelliği.
- **Favoriler:** Beğenilen tarifleri favori listesine ekleme.
- **Profil Yönetimi:** Kullanıcı profil bilgilerini güncelleme.
- **Modern UI:** Mantine UI ve React kullanılarak oluşturulmuş responsive tasarım.
- **Ödeme Entegrasyonu:** Stripe altyapısı (hazırlık aşamasında/mevcut).

## Kullanılan Teknolojiler

### Frontend
- **React 19** & **Vite**
- **Mantine UI** (Bilesen kütüphanesi)
- **React Router Dom** (Navigasyon)
- **Jotai** (State yönetimi)
- **Axios** (API istekleri)
- **React Hook Form & Yup** (Form yönetimi ve validasyon)
- **React Toastify** (Bildirimler)

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Veritabanı)
- **JSON Web Token (JWT)** (Kimlik doğrulama)
- **Bcrypt** (Şifreleme)
- **Multer** (Dosya yükleme)
- **Stripe** (Ödeme sistemi)

## Kurulum

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/kullaniciadi/food-recipe.git
cd food-recipe
```

### 2. Backend Kurulumu
```bash
cd backend
npm install
```
`.env` dosyasını oluşturun ve gerekli değişkenleri ekleyin:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

### 3. Frontend Kurulumu
```bash
cd ../frontend
npm install
```

## Çalıştırma

### Backend'i Başlatın
```bash
cd backend
npm start
```

### Frontend'i Başlatın
```bash
cd frontend
npm run dev
```
Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## Lisans
Bu proje [ISC](LICENSE) lisansı altındadır.

---
⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
