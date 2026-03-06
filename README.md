# 🍃 Serender Nut House - E-Commerce Platform

Modern, hızlı ve güvenli bir e-ticaret deneyimi sunmak için tasarlanmış; organik ve yöresel ürünlerin satışına odaklanan yeni nesil web uygulaması.

Bu proje, Next.js 15'in gücünü, Supabase'in güvenliğini ve Drizzle ORM'in tip güvenli (type-safe) veritabanı yönetimini birleştirerek hem müşteriler için kusursuz bir alışveriş deneyimi hem de yöneticiler için güçlü bir "Admin Paneli" sunar.

---

## ✨ Öne Çıkan Özellikler

### 🛍️ Müşteri Deneyimi (Vitrin)
- **Hızlı ve Akıcı Arayüz:** Next.js App Router ve SSR (Server-Side Rendering) ile sıfır bekleme süresi.
- **Güvenli Kimlik Doğrulama:** Supabase Auth entegrasyonu ile güvenli Kayıt/Giriş (Server Actions destekli).
- **Akıllı Hesap Paneli:** Kullanıcı profil bilgileri ve sipariş geçmişinin paralel veri çekme (`Promise.all`) yöntemiyle anında yüklendiği optimize edilmiş sayfa yapısı.
- **Kusursuz UX:** İşlem bekleme (Loading) durumları, özel "Skeleton" ekranlar ve hatalara karşı anında geri bildirimler (Toast/Alert).

### 👑 Patron Modu (Admin Dashboard)
- **Rol Tabanlı Erişim Kontrolü (RBAC):** Sadece `admin` yetkisine sahip kullanıcıların erişebildiği, dış dünyadan izole edilmiş güvenli yönetim paneli.
- **Dinamik Veri Yönetimi:** Ürün ekleme, düzenleme, silme ve kategori yönetimi.
- **Gelişmiş İstatistikler:** Siparişler, gelir, yeni kullanıcılar gibi verilerin anlık analizini sunan gösterge paneli.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Kategori | Teknoloji |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React  |
| **Dil** | TypeScript |
| **Veritabanı** | PostgreSQL (Supabase) |
| **ORM** | Drizzle ORM |
| **Kimlik Doğrulama** | Supabase Auth |
| **Stil / UI** | Tailwind CSS, Shadcn UI, Lucide Icons |

---

## 🗄️ Veritabanı Mimarisi (Performans Odaklı)

Sistem, büyük veri yükleri altında bile yavaşlamaması için özel indekslerle (Indexes) donatılmıştır:
- `orders` tablosunda kullanıcının siparişlerini anında bulmak için `userId` indeksi.
- `products` tablosunda hızlı listeleme için `categoryId` ve `createdAt` indeksleri.
- `profiles` tablosunda kayıt esnasında çakışmaları engellemek için `phone` indeksi.

---

## 👨‍💻 Geliştirici (Author)
Bu proje, modern web standartlarına ve kusursuz kullanıcı deneyimine (UX) tutkuyla bağlı kalınarak geliştirilmiştir. 

[Görkem Karagöl](https://github.com/gorkemkaragl) | [LinkedIn Profilin](https://linkedin.com/in/gorkemkaragol)