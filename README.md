# Challenge 06 Cars API

- Repository ini ditujukan sebagai boilerplate dalam membuat sebuah HTTP Server menggunakan Express.js 
<br />
- Repository ini menggunakan Service Repository Pattern, yang artinya di dalam repository ini terdapat modul model, controller, service, dan repository.

## Getting Started

Perintah untuk menginstall dependencies yang digunakan 

```sh
npm i atau npm install
```

Perintah untuk membuat database

```sh
sequelize db:create
```

Perintah untuk melakukan migrate yang berfungsi untuk membuat atau perubahan pada tabel-tabel di database

```sh
sequelize db:migrate
```

Perintah untuk melakukan penambahan data super admin

```sh
sequelize db:seed:all
```

Perintah untuk menjalankan development server dengan salah satu script di package.json, yang namanya `develop`.

```sh
npm run develop
```

Data super admin untuk login

```json
"email": "adminsuper@email.com",
"encryptedPassword": "adminsuper"
```

API Document
```js
http://localhost:8046/api-docs
```

