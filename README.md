# EIGEN 3 TECHNICAL TEST BACKEND DEVELOPER

### **Borrow Book API:**

#### Diagram ERD



---

### **Summary Relasi** :

1. **One-to-Many** :

* `Member` ke `Borrowbook`: Satu member bisa meminjam banyak buku.
* `Book` ke `Borrowbook`: Satu buku bisa dipinjam beberapa kali.
* `Role` ke `Member`: Satu peran bisa dimiliki oleh banyak membeer.

1. **Many-to-One** :

* `Borrowbook` ke `Member`: Banyak peminjaman buku terkait dengan satu member.
* `Borrowbook` ke `Book`: Banyak peminjaman terkait dengan satu buku.

1. **One-to-One** :

* `Penalty` ke `Member`: Satu penalti untuk satu member.

---

### library & framework :

* **@prisma/client** : digunakan untuk berinteraksi dengan database menggunakan  **Prisma ORM** . Prisma menyediakan cara untuk melakukan query dan manajemen database dengan JavaScript/TypeScript.
* **bcrypt :** Library untuk hashing dan memvalidasi password menggunakan algoritma **bcrypt** .
* **cookie-parser :** Middleware Express untuk parsing cookies yang dikirim oleh client.
* **cors :** Middleware Express untuk mengaktifkan **Cross-Origin Resource Sharing** (CORS), memungkinkan akses ke API dari domain berbeda.
* **dotenv :** Library untuk memuat variabel lingkungan (environment variables) dari file .env ke dalam process.env
* **express-validator :** Middleware untuk validasi dan sanitasi data yang dikirim melalui HTTP request.
* **express :** Framework yang ringan untuk membangun aplikasi web dan API dengan Node.js
* **jest :** Framework testing JavaScript untuk unit test, integration test, dan end-to-end test
* **jsonwebtoken :** Library untuk membuat dan memverifikasi  **JSON Web Tokens (JWT)** , biasanya digunakan untuk autentikasi
* **module-alias :** Library yang memungkinkan pembuatan alias untuk module paths di Node.js, membantu dalam manajemen path yang lebih rapi
* **moment :** Library untuk manipulasi dan format tanggal/waktu, meskipun saat ini sering digantikan oleh **date-fns** atau **luxon** karena masalah ukuran dan performa.
* **morgan :** Middleware logging untuk HTTP request di aplikasi Express, digunakan untuk mencatat setiap request yang diterima server.
* **prisma :** Tool yang digunakan untuk bekerja dengan database menggunakan  **Prisma ORM** . Prisma mengelola database schema dan menyediakan query builder.
* **reflect-metadata :** Polyfill untuk **metadata reflection** yang sering digunakan dalam TypeScript untuk mendukung decorators dan dependency injection.
* **supertest :** Library untuk melakukan testing API HTTP
* **swagger-jsdoc :** ibrary untuk membuat dokumentasi API dari JSDoc comments dan menyajikannya menggunakan Swagger.
* **swagger-ui-express :** Middleware yang menyajikan dokumentasi Swagger UI di Express, memudahkan pengguna untuk melihat dan menguji API.
* **typescript :** TypeScript adalah superset dari JavaScript yang menambahkan tipe statis. Library ini digunakan untuk menulis kode TypeScript dan melakukan transpile menjadi JavaScript.
* **ts-node-dev :** Tool untuk menjalankan aplikasi TypeScript dengan hot-reload, mirip seperti nodemon tapi untuk TypeScript.

---

### DATABSE :

* **POSTGRESQL**

### SWAGGER - DOC

dokumentasi Swagger OpenAPI dapat diakses melalui route: `http://localhost:3000/api-docs`

### POSTMAN

link collection : https://documenter.getpostman.com/view/18320873/2sAXqngkZ5

### SETUP PROGRAM :

Dokumentasi ini akan memandu cara menjalankan program ini di lokal environment.

1. Clone Repository

```bash
git clone https://github.com/ridho808/Eigen3dev-backend-test.git
```

2. Masuk ke direktori/folder **BACKEND-TEST** dengan perintah di terminal :

```bash
cd Eigen3dev-backend-test/BACKEND-TEST
```

3. Install semua Depedensi program dengan perintah :

```bash
npm install
```

4. Edit variabel di file .env sesuai yang diinginkan

```
DATABASE_URL="postgresql://user:root@127.0.0.1:5432/books_rental?schema=public"
PORT=3000
JWT_SECRET=a7f216d7446fa546014572ae38a4a822830246c821a919eefbce0c0d7b62db65
```

* note :
  * DATABASE_URL : untuk Connection String (project mengunakan postgres)
  * PORT : nomor unik yang dijalankan di aplikasi server
  * JWT_SECRET : code acak untuk ke amanan token JSON WEB TOKEN

5. Mengaktifkan Prisma Client untuk interaksi ke Database dengan perintah :

```
npx prisma generate
```

6. Pastikan Server Database postgre sudah aktif
7. Jalankan migrasi prisma untuk membuat tabel ke database dengan perintah :

   ```bash
   npx prisma migrate dev --name push_to_db:final
   # atau 
   npx prisma deploy
   ```
8. Jalankan Perintah Seeder role untuk insert data kedalam tabel role dan book :

   ```bash
   npm run seeder
   ```
9. Jalankan Server nodejs dengan perintah :

   ```
   npm run dev
   ```

Program server-side akan berjalan di http://localhost:3000/

---

### RUNNING WIT DOCKER : 

untuk menjalankan program dengan docker

1. masukkan perintah di terminal :

   ```bash
   docker compose build && docker compose up
   ```
2. tunggu sampai installasi selesai

---

### RUNNING TEST :

untuk menjalankan test masukkan perintah :

```bash
npm run test
```



@doolean.dev
